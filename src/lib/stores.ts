import type { Models } from 'appwrite';
import { writable } from 'svelte/store';

export const accountStore = writable<undefined | null | Models.User<any>>(undefined);
