// src/utils/token-storage.ts
//
// Thin wrapper around expo-secure-store. Rest of the app should never
// import expo-secure-store directly — always go through these functions.
// If you ever swap storage libraries, this is the only file that changes.


import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export async function saveToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
    return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function deleteToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
}