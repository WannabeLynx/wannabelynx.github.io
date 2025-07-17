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