import { useEffect, useState } from "react";
import { useNotesStore } from "@/stores/use-notes-store";

export function useNotesHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useNotesStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useNotesStore.persist.hasHydrated()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHydrated(true);
    }

    return unsub;
  }, []);

  return hydrated;
}
