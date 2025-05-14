import { useEffect, useRef } from 'react';

export function useUpdateState(back, dep) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    back();
  }, dep);
}

