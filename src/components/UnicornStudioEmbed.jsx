import { useEffect, useRef } from 'react';

export default function UnicornStudioEmbed({ 
  projectId = "1qpipNvszw8yfmoe6OyZ", 
  width = "100%", 
  height = "900px",
  fullPage = false 
}) {
  const elementRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    // Initialize script (optimized based on Framer component)
    const initializeScript = (callback) => {
      if (!window.UnicornStudio) {
        window.UnicornStudio = { isInitialized: false };
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
        script.onload = function() {
          if (!window.UnicornStudio.isInitialized) {
            UnicornStudio.init();
            window.UnicornStudio.isInitialized = true;
          }
          callback();
        };
        script.onerror = () => console.error("Failed to load UnicornStudio script");
        (document.head || document.body).appendChild(script);
      } else {
        callback();
      }
    };

    // Initialize Unicorn Studio
    const initializeUnicornStudio = () => {
      if (projectId && elementRef.current) {
        elementRef.current.setAttribute("data-us-project", projectId);

        if (window.UnicornStudio) {
          // Check for existing scene
          const existingScene = window.UnicornStudio.scenes?.find(
            scene => scene.element === elementRef.current || 
                     scene.element?.contains(elementRef.current)
          );

          if (existingScene) {
            existingScene.destroy();
          }

          // Initialize new scene
          window.UnicornStudio.init().then(scenes => {
            const ourScene = scenes.find(
              scene => scene.element === elementRef.current || 
                       scene.element?.contains(elementRef.current)
            );
            if (ourScene) {
              sceneRef.current = ourScene;
            }
          }).catch(err => {
            console.error("Failed to initialize UnicornStudio:", err);
          });
        }
      }
    };

    if (projectId) {
      if (window.UnicornStudio) {
        initializeUnicornStudio();
      } else {
        initializeScript(initializeUnicornStudio);
      }
    }

    // Cleanup
    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, [projectId]);

  const baseStyle = {
    width: width,
    height: height,
    position: 'relative',
    zIndex: 1,
    minHeight: '300px',
  };

  const fullPageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0,
    minHeight: '100vh',
  };

  return (
    <div 
      ref={elementRef}
      data-us-dpi="1.5"
      data-us-scale="1"
      data-us-fps="60"
      data-us-lazyload="false"
      style={fullPage ? fullPageStyle : baseStyle}
      aria-label="Interactive 3D Animation showcasing Frog8 technology"
      role="img"
    />
  );
}

