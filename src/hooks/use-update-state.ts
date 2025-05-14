import { useEffect, useRef } from 'react';

export function useUpdateState(back, dep, firstRender = false) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!firstRender)
        return;
    }

    back();
  }, dep);
}

