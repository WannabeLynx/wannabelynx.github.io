<template>
  <section class="relative py-24 px-6 md:px-12">
    <GlowDivider color="primary" />

    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl md:text-5xl text-foreground mb-6 text-center">
        {{ title }}
      </h2>
      
      <p class="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
        {{ subtitle }}
      </p>

      <div class="grid md:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="backdrop-blur-sm bg-popover/60 border border-primary/20 rounded-xl p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(100,255,218,0.15)]">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-2">
              <label for="name" class="text-foreground text-sm font-medium">Name</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                placeholder="Your name"
                required
                class="w-full bg-popover/60 border border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary focus:ring-primary/20 rounded-md p-2"
              />
            </div>

            <div class="space-y-2">
              <label for="email" class="text-foreground text-sm font-medium">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="your.email@example.com"
                required
                class="w-full bg-popover/60 border border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary focus:ring-primary/20 rounded-md p-2"
              />
            </div>

            <div class="space-y-2">
              <label for="message" class="text-foreground text-sm font-medium">Message</label>
              <textarea
                id="message"
                v-model="formData.message"
                placeholder="Tell me about your project..."
                required
                rows="5"
                class="w-full bg-popover/60 border border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary focus:ring-primary/20 rounded-md p-2 resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              class="w-full !text-primary-foreground hover:shadow-glow group"
            >
              Send Message
              <SendIcon class="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </form>
        </div>

        <div class="space-y-8">
          <ConnectCard :links="socialLinks" />

          <div class="backdrop-blur-sm bg-popover/60 border border-secondary/20 rounded-xl p-8 hover:border-secondary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,64,251,0.15)]">
            <h3 class="text-xl text-foreground mb-4">
              {{ availabilityTitle }}
            </h3>
            <p class="text-foreground/70 leading-relaxed">
              {{ availabilityText }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-24 text-center">
        <div class="inline-flex items-center gap-2 text-foreground/50">
          <span>Built with</span>
          <span class="text-secondary">♥</span>
          <span>by {{ footerName }}</span>
        </div>
        <p class="mt-2 text-foreground/40">
          © {{ new Date().getFullYear() }} All rights reserved.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { GlowDivider, Button, ConnectCard } from 'rory-components';

// --- Local Icon Components ---
const SendIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'm22 2-7 20-4-9-9-4Z' }), h('path', { d: 'M22 2 11 13' })]);
const GithubIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'w-6 h-6 text-primary' }, [
  h('path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' }),
  h('path', { d: 'M9 18c-4.51 2-5-2-7-2' }),
]);

const LinkedinIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'w-6 h-6 text-secondary' }, [
  h('path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }),
  h('rect', { width: '4', height: '12', x: '2', y: '9' }),
  h('circle', { cx: '4', cy: '4', r: '2' }),
]);

const MailIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'w-6 h-6 text-accent' }, [
  h('path', { d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' }),
  h('rect', { x: '2', y: '4', width: '20', height: '16', rx: '2' }),
]);

const socialLinks = [
  { label: "GitHub", icon: GithubIcon, url: "https://github.com/WannabeLynx" },
  { label: "LinkedIn", icon: LinkedinIcon, url: "https://linkedin.com/in/nino-baer/" },
  { label: "Email", icon: MailIcon, url: "mailto:ninoleonbaer@gmail.com" },
];

const title = 'Get In Touch';
const subtitle = "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!";
const availabilityTitle = '-'
const availabilityText = "Let's create something amazing together!";
const footerName = 'Nino Bär';

// --- Form State ---
const formData = ref({
  name: "",
  email: "",
  message: ""
});

const handleSubmit = () => {
  console.log("Form submitted:", formData.value);
  alert("Thanks for reaching out! This is a demo form and does not send emails.");
  // Reset form
  formData.value = { name: "", email: "", message: "" };
};

// --- Props ---
interface SocialLink {
  name: string;
  iconName: 'github' | 'linkedin' | 'mail';
  url: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  socialLinks?: SocialLink[];
  availabilityTitle?: string;
  availabilityText?: string;
  footerName?: string;
}
</script>
