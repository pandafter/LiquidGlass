## ■ Liquid Glass UI
**Liquid Glass UI** es una librería experimental de componentes UI inspirada en el estilo de vidrio
líquido de iOS 26, pero optimizada para la web.
### ■ Características
- ■ 100% Web-Friendly, sin WebGL ni Three.js.
- ■ Efecto vidrio líquido realista con bordes diagonales.
- ■■ Switches draggeables con perilla de vidrio.
- ■ Soporte de gradientes dinámicos.
- ■ Responsivo y ligero.
- ■ Optimizado para rendimiento.
### ■ Instalación
```bash
git clone https://github.com/tuusuario/liquid-glass-ui.git
cd liquid-glass-ui
npm install
```
### ■ Ejemplo de IOS26Button
```tsx
<IOS26Button
 accent="auto"
 autoAccent
 radius={24}
 centerBlur={1}
 edgeBlur={8}
 vignette={0.62}
 feather={34}
>
 Continuar
</IOS26Button>
```
### ■ Ejemplo de GlassBedButton
```tsx
<GlassBedButton width="8rem" height="3.25rem" bedColor="#22c55e22" glowColor="#22c55e55" radius={24}>
 <div className="px-4 py-2">Guardar</div>
</GlassBedButton>
```
### ■ Ejemplo de GlassBedSwitch
```tsx
<GlassBedSwitch
 checked={wifi}
 onChange={setWifi}
 bedOn="#22c55e33"
 bedOff="#ffffff18"
 glowOn="#22c55e55"
 glowOff="transparent"
/>
```
### ■ Roadmap
- [ ] Publicar como paquete npm.
- [ ] Ampliar componentes (inputs, modals).
- [ ] Crear playground con Storybook.
- [ ] Mejorar accesibilidad (focus, ARIA).
### ■ Historia del Proyecto
El proyecto nació como un experimento con **Three.js**, utilizando displacement maps y materiales
3D para lograr un efecto de vidrio líquido realista. Sin embargo, el rendimiento era inadecuado para
entornos web. Liquid Glass UI surge como una reinterpretación 2D/2.5D que logra mantener la estética
sin comprometer la velocidad.
### ■ Licencia
Este proyecto es open source bajo licencia MIT.
### ■■■ Autores
- Nicolas Leyva
- Sebastian Rodriguez