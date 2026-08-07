import { apiClient } from "./client";
import { queryKeys } from "./query-keys";
import type { UserPreferences } from "../types/settings";
import { useTransitionProgress } from "react-native-screens";

export const setttingApi = {

    getPreferences: async(): Promise<UserPreferences> => {
        const { data } = await apiClient.get<UserPreferences>('/users/me/preferences');
        return data;
    },

    updatePreferences: async(prefs: Partial<UserPreferences>): Promise<UserPreferences> => {
        const { data } = await apiClient.patch('/users/me/preferences', prefs);
        return data;
    },

    // update single field
    updatePreferencesField: async< K extends keyof UserPreferences>(
        key: K,
        value: UserPreferences[K]
    ): Promise<UserPreferences>  => {
        const { data } = await apiClient.patch('/users/me/preferences', {[key]: value});
        return data;
    }

}
