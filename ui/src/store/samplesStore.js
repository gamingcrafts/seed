import React from "react";
import { useLocalObservable } from "mobx-react-lite";

const StoreContext = React.createContext(null);

export const SamplesStoreProvider = ({ children }) => {
  const store = useLocalObservable(createSamplesStore);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useSamplesStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};

export const createSamplesStore = () => {
  return {
    samples: [],

    addSample(item) {
      this.samples.push(item);
    },

    setSamples(samples) {
      this.samples.replace(samples);
    }
  };
}