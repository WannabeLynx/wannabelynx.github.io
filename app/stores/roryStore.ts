import { defineStore } from 'pinia';

export const useRoryStore = defineStore('roryStore', {
  state: () => ({
    isNavOpen: false,
    isDomOpen: false,
  }),
  actions: {
    onToggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
    onToggleDom() {
      this.isDomOpen = !this.isDomOpen;
    }
  }
});