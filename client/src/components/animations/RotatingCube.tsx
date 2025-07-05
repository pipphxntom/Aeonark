import { useEffect, useRef } from 'react';

interface RotatingCubeProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function RotatingCube({ 
  width = 800, 
  height = 600, 
  className = "" 
}: RotatingCubeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    
    mountRef.current.appendChild(canvas);

    // CSS 3D cube animation
    const cubeHTML = `
      <div class="cube-container" style="
        position: relative;
        width: 200px;
        height: 200px;
        margin: 100px auto;
        perspective: 1000px;
      ">
        <div class="cube" style="
          position: relative;
          width: 200px;
          height: 200px;
          transform-style: preserve-3d;
          animation: rotate 8s infinite linear;
        ">
          <div class="face front" style="
            position: absolute;
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #001122 0%, #002244 100%);
            border: 2px solid #39FF14;
            box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
            transform: rotateY(0deg) translateZ(100px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            color: #39FF14;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
          ">
            <div>
              const app = {<br/>
              &nbsp;&nbsp;build: () => {<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;return magic;<br/>
              &nbsp;&nbsp;}<br/>
              };
            </div>
          </div>
          <div class="face back" style="
            position: absolute;
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #111111 0%, #222222 100%);
            border: 2px solid #00FFFF;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
            transform: rotateY(180deg) translateZ(100px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #00FFFF;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
          ">
            <div>
              🌐 Website<br/>
              📱 Mobile App<br/>
              🤖 AI Agent<br/>
              ⚡ AeonForge
            </div>
          </div>
          <div class="face right" style="
            position: absolute;
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #002211 0%, #004422 100%);
            border: 2px solid #FF6B00;
            box-shadow: 0 0 20px rgba(255, 107, 0, 0.3);
            transform: rotateY(90deg) translateZ(100px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #FF6B00;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
          ">
            <div>
              📱 Mobile UI<br/>
              🎨 Design<br/>
              ⚡ Fast Loading<br/>
              📊 Analytics
            </div>
          </div>
          <div class="face left" style="
            position: absolute;
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #220011 0%, #440022 100%);
            border: 2px solid #FF00FF;
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
            transform: rotateY(-90deg) translateZ(100px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #FF00FF;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
          ">
            <div>
              🔗 Neural Network<br/>
              🧠 AI Processing<br/>
              ⚡ Smart Agents<br/>
              🎯 Automation
            </div>
          </div>
          <div class="face top" style="
            position: absolute;
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #001100 0%, #002200 100%);
            border: 2px solid #00FF00;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
            transform: rotateX(90deg) translateZ(100px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #00FF00;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
          ">
            <div>
              🧠 AI Nodes<br/>
              🔗 Connections<br/>
              ⚡ Data Flow<br/>
              🎯 Intelligence
            </div>
          </div>
          <div class="face bottom" style="
            position: absolute;
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #110000 0%, #220000 100%);
            border: 2px solid #FF0000;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
            transform: rotateX(-90deg) translateZ(100px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #FF0000;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
          ">
            <div>
              ⚡ AeonForge<br/>
              📋 AeonRFP<br/>
              🤖 AeonAgent<br/>
              🚀 Innovation
            </div>
          </div>
        </div>
      </div>
    `;

    // Add CSS keyframes for rotation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rotate {
        from { transform: rotateX(0deg) rotateY(0deg); }
        to { transform: rotateX(360deg) rotateY(360deg); }
      }
    `;
    document.head.appendChild(style);

    // Create container and add cube
    const container = document.createElement('div');
    container.innerHTML = cubeHTML;
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.background = '#0C0C0E';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    
    mountRef.current.appendChild(container);

    // Add floating particles
    const particles = document.createElement('div');
    particles.innerHTML = Array.from({ length: 20 }, (_, i) => `
      <div style="
        position: absolute;
        width: 2px;
        height: 2px;
        background: #39FF14;
        border-radius: 50%;
        animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${0.3 + Math.random() * 0.7};
      "></div>
    `).join('');
    
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
    `;
    document.head.appendChild(particleStyle);
    
    container.appendChild(particles);

    // Cleanup
    return () => {
      if (mountRef.current && container) {
        mountRef.current.removeChild(container);
      }
      if (mountRef.current && canvas) {
        mountRef.current.removeChild(canvas);
      }
      document.head.removeChild(style);
      document.head.removeChild(particleStyle);
    };
  }, [width, height]);

  return (
    <div 
      ref={mountRef} 
      className={`relative ${className}`}
      style={{ width, height, background: '#0C0C0E' }}
    />
  );
}