import { defineStore } from 'pinia';

export const useRoryStore = defineStore('roryStore', {
  state: () => ({
    isNavOpen: false,
    isDomOpen: false,
    isScreenOpen: false,
    screenType: ''
  }),
  actions: {
    onToggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
    onToggleDom() {
      this.isDomOpen = !this.isDomOpen;
      if (!this.isDomOpen) {
        this.isScreenOpen = false;
        this.screenType = '';
      }
    },
    onOpenScreen(screenType: string) {
      this.isScreenOpen = true;
      this.screenType = screenType;
    },
    onCloseScreen() {
      this.isScreenOpen = false;
      this.screenType = '';
    }
  }
});