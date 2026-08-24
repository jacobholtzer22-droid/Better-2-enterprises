'use client'

import { useRef, useState, type FormEvent } from 'react'
import { Phone } from 'lucide-react'
import { site } from '@/site.config'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Quote request form → Align & Acquire CRM.
 *
 * POSTs EXACTLY { name, phone, email, message, smsConsent, businessSlug } to
 * the www endpoint (the bare apex 308s and drops the POST).
 *
 * Anti-bot: honeypot field ("website" — the CRM also rejects it server-side)
 * and a minimum 3 seconds between mount and submit. Both fail silently into
 * the success state so bots learn nothing.
 *
 * GATE: while businessSlug is 'PENDING_SLUG_VERIFICATION' the form NEVER
 * posts — a wrong slug returns HTTP 200 with no database write, which would
 * show a fake success while the lead vanishes. Instead it renders the error
 * state with the phone fallback.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const mountedAt = useRef<number>(Date.now())

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: a human never fills this. Pretend success.
    if (String(data.get('website') || '').length > 0) {
      setStatus('success')
      return
    }
    // Timing floor: real people take longer than bots.
    if (Date.now() - mountedAt.current < site.form.minSubmitSeconds * 1000) {
      setStatus('success')
      return
    }

    const payload = {
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
      smsConsent: data.get('smsConsent') === 'on',
      businessSlug: site.form.businessSlug,
    }

    // Slug gate: never POST with the placeholder — see docstring.
    if (site.form.businessSlug === 'PENDING_SLUG_VERIFICATION') {
      console.warn('[form] businessSlug pending verification — submission blocked')
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(site.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-joint bg-form p-8">
        <p className="font-display text-2xl font-bold uppercase">Request received</p>
        <p className="mt-3 max-w-md text-aggregate">
          Thanks — your quote request is in. We will get back to you about the work. If it is
          urgent, call{' '}
          <a href={`tel:${site.identity.phone.e164}`} className="font-mono font-medium text-chalk underline underline-offset-4">
            {site.identity.phone.display}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      {/* Honeypot — visually hidden, tab-unreachable, never filled by humans. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="station block !text-ink">
            Name <span aria-hidden="true" className="text-chalk">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 w-full border border-joint bg-white px-4 py-3 text-base"
          />
        </div>
        <div>
          <label htmlFor="phone" className="station block !text-ink">
            Phone <span aria-hidden="true" className="text-chalk">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="mt-2 w-full border border-joint bg-white px-4 py-3 text-base"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className="station block !text-ink">
          Email <span className="normal-case tracking-normal text-aggregate">(optional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="mt-2 w-full border border-joint bg-white px-4 py-3 text-base"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="station block !text-ink">
          What do you need done? <span aria-hidden="true" className="text-chalk">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Where is the job, and roughly what is the work?"
          className="mt-2 w-full border border-joint bg-white px-4 py-3 text-base"
        />
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input
          id="smsConsent"
          name="smsConsent"
          type="checkbox"
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--chalk)]"
        />
        <label htmlFor="smsConsent" className="text-sm leading-relaxed text-aggregate">
          {site.form.smsConsentLabel}
        </label>
      </div>

      {status === 'error' && (
        <div role="alert" className="mt-5 border border-joint bg-form p-4">
          <p className="font-semibold">Something went wrong sending your request.</p>
          <p className="mt-1 text-sm text-aggregate">
            Please call us instead — a phone call always gets through:{' '}
            <a href={`tel:${site.identity.phone.e164}`} className="font-mono font-medium text-chalk underline underline-offset-4">
              {site.identity.phone.display}
            </a>
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="hover-raise mt-7 inline-flex min-h-12 items-center bg-chalk px-8 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send quote request'}
      </button>
    </form>
  )
}
