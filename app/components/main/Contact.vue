<template>
  <section id="contact" class="relative pt-24 md:pt-32 pb-6 px-6 md:px-12">
    <GlowDivider color="primary" />
    <div class="max-w-5xl mx-auto">
      <header class="reveal mb-14">
        <span class="block font-mono text-[.7rem] tracking-[.24em] uppercase text-primary mb-3.5">04 — Transmission</span>
        <h2 class="font-lora font-medium text-foreground text-4xl md:text-5xl leading-tight" style="text-wrap:balance">Get In Touch</h2>
        <div class="h-px mt-6" style="background:linear-gradient(90deg, var(--border), transparent)"></div>
      </header>

      <div class="grid md:grid-cols-[1.1fr_.9fr] gap-10 md:gap-14 items-start">
        <form class="reveal border border-[color:var(--border)] rounded-[2px] bg-[color:var(--popover)] p-6 md:p-8" @submit.prevent="handleSubmit">
          <div class="flex justify-between font-mono text-[.66rem] tracking-[.2em] uppercase text-foreground/40 mb-6">
            <span>◦ Message console</span>
            <span class="text-secondary">● Online</span>
          </div>

          <div v-for="field in fields" :key="field.key" class="mb-[1.15rem]">
            <label :for="field.key" class="block font-mono text-[.62rem] tracking-[.16em] uppercase text-foreground/60 mb-2">{{ field.label }}</label>
            <input
              v-if="field.key !== 'message'"
              :id="field.key"
              v-model="formData[field.key]"
              :type="field.type"
              :placeholder="field.placeholder"
              required
              class="w-full bg-[color:var(--background)] border border-[color:var(--border)] text-foreground placeholder:text-foreground/40 rounded-[2px] px-3.5 py-2.5 outline-none focus:border-primary/60 focus:ring-[3px] focus:ring-primary/15 transition-colors"
            />
            <textarea
              v-else
              :id="field.key"
              v-model="formData.message"
              rows="5"
              :placeholder="field.placeholder"
              required
              class="w-full resize-none bg-[color:var(--background)] border border-[color:var(--border)] text-foreground placeholder:text-foreground/40 rounded-[2px] px-3.5 py-2.5 outline-none focus:border-primary/60 focus:ring-[3px] focus:ring-primary/15 transition-colors"
            />
          </div>

          <input
            v-model="botField"
            type="text"
            name="botcheck"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
            class="hidden"
          />

          <Button type="submit" variant="default" class="w-full" :disabled="status === 'sending'">
            <template v-if="status === 'sending'">Transmitting…</template>
            <template v-else>Send transmission <span class="transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span></template>
          </Button>

          <p v-if="status === 'success'" class="font-mono text-[.6rem] text-secondary mt-3.5 text-center">✦ Transmission received — thank you, I'll be in touch.</p>
          <p v-else-if="status === 'error'" class="font-mono text-[.6rem] text-destructive mt-3.5 text-center">{{ errorMessage }}</p>
          <p v-else class="font-mono text-[.6rem] text-foreground/40 mt-3.5 text-center">Or reach me directly through the channels →</p>
        </form>

        <!-- links + availability -->
        <div class="reveal flex flex-col gap-4">
          <ConnectCard :links="socialLinks" />
          <div class="border border-[color:var(--border)] rounded-[2px] bg-[color:var(--popover)] p-6">
            <h3 class="font-lora text-foreground text-lg mb-2">{{ availabilityTitle }}</h3>
            <p class="text-foreground/60 text-sm" style="text-wrap:pretty">{{ availabilityText }}</p>
          </div>
        </div>
      </div>

      <footer class="mt-20 pt-8 border-t border-[color:var(--border)] text-center">
        <p class="font-mono text-[.64rem] tracking-[.1em] uppercase text-foreground/35 leading-[2]">Built with Nuxt V4 &amp; Tailwind V4</p>
        <p class="font-mono text-[.64rem] tracking-[.1em] uppercase text-foreground/35 leading-[2]"><span class="text-primary">✦</span> © {{ year }} Nino Bär — All rights reserved</p>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { GlowDivider, Button, ConnectCard } from 'rory-components';

const stroke = (children: any[]) => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, children);

const GithubIcon = () => stroke([h('path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' }), h('path', { d: 'M9 18c-4.51 2-5-2-7-2' })]);
const LinkedinIcon = () => stroke([h('path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }), h('rect', { width: '4', height: '12', x: '2', y: '9' }), h('circle', { cx: '4', cy: '4', r: '2' })]);
const MailIcon = () => stroke([h('rect', { x: '2', y: '4', width: '20', height: '16', rx: '2' }), h('path', { d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' })]);

const socialLinks = [
  { label: 'GitHub', icon: GithubIcon, url: 'https://github.com/WannabeLynx', hint: '@WannabeLynx' },
  { label: 'LinkedIn', icon: LinkedinIcon, url: 'https://linkedin.com/in/nino-baer/', hint: 'nino-baer' },
  { label: 'Email', icon: MailIcon, url: 'mailto:ninoleonbaer@gmail.com', hint: '' },
];

const fields = [
  { key: 'name' as const, label: 'Name', type: 'text', placeholder: 'Your name' },
  { key: 'email' as const, label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
  { key: 'message' as const, label: 'Message', type: 'text', placeholder: 'Tell me about your project…' },
];

const availabilityTitle = 'ขอบคุณที่เข้ามาเยี่ยมชมเว็บไซต์ของผม';
const availabilityText = 'Thank you for visiting my website.';
const year = new Date().getFullYear();

const WEB3FORMS_ACCESS_KEY = 'd4423b4d-1b0d-4436-91bf-6d2848b980ab';

const formData = ref<{ name: string; email: string; message: string }>({ name: '', email: '', message: '' });
const botField = ref('');
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle');
const errorMessage = ref('');

const handleSubmit = async () => {
  if (status.value === 'sending') return;

  if (botField.value) {
    status.value = 'success';
    formData.value = { name: '', email: '', message: '' };
    return;
  }

  status.value = 'sending';
  errorMessage.value = '';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Portfolio contact — ${formData.value.name || 'someone'}`,
        from_name: 'Nino Bär Portfolio',
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message,
      }),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      status.value = 'success';
      formData.value = { name: '', email: '', message: '' };
    } else {
      status.value = 'error';
      errorMessage.value = data.message || 'Could not send — please use the email link instead.';
    }
  } catch {
    status.value = 'error';
    errorMessage.value = 'Network error — please use the email link instead.';
  }
};
</script>
