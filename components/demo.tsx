import { useState, CSSProperties, useEffect } from 'react'

import { useQRCode } from 'next-qrcode'
import { SketchPicker } from 'react-color'
import { usePrism } from 'next-prism'

import styles from './demo.module.css'

import 'next-prism/themes/tomorrow.css'

export default function Demo() {
  const { Canvas, SVG, Image } = useQRCode()
  const { Code, highlightAll } = usePrism()

  const [selectedRenderAs, setSelectedRenderAs] = useState('canvas')
  const [text, setText] = useState('https://github.com/Bunlong/next-qrcode')
  const [src, setSrc] = useState('https://next-qrcode.js.org/github.png')
  const [includeOptions, setIncludeOptions] = useState(true)
  const [selectedType, setSelectedType] = useState('image/png')
  const [quality, setQuality] = useState(0.3)
  const [selectedLevel, setSelectedLevel] = useState('L')
  const [margin, setMargin] = useState(2)
  const [scale, setScale] = useState(5)
  const [width, setWidth] = useState(150)
  const [displayDarkColorPicker, setDisplayDarkColorPicker] = useState(false)
  const [darkColor, setDarkColor] = useState('#010599FF')
  const [displayLightColorPicker, setDisplayLightColorPicker] = useState(false)
  const [lightColor, setLightColor] = useState('#FFBF60FF')
  const [includeLogo, setIncludeLogo] = useState(true)
  const [includeLogoOptions, setIncludeLogoOptions] = useState(true)
  const [widthLogo, setWidthLogo] = useState(35)
  const [centerLogo, setCenterLogo] = useState(true)
  const [x, setX] = useState<any>(undefined)
  const [y, setY] = useState<any>(undefined)

  const [selectedRenderAsStr, setSelectedRenderAsStr] = useState<string>('')
  const [includeLogoOptionsStr, setIncludeLogoOptionsStr] = useState<string>('')
  const [componentStr, setComponentStr] = useState<string>('')
  const [includeOptionsStr, setIncludeOptionsStr] = useState<string>('')
  const [logoStr, setLogoStr] = useState<string>('')

  const disabled = Object.assign(
    {
      width: '100%',
      padding: '5px',
      background: '#fff',
      borderRadius: '5px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
    },
    !includeOptions ? { pointerEvents: 'none', opacity: 0.7 } : {}
  ) as CSSProperties

  useEffect(() => {
    if (selectedRenderAs === 'canvas') {
      setSelectedRenderAsStr('Canvas')

      if (includeLogoOptions) {
        setIncludeLogoOptionsStr(`options: {
            width: ${widthLogo},
            x: ${x},
            y: ${y},
          },`)
      }

      if (includeLogo) {
        if (includeLogoOptions) {
          setLogoStr(`logo={{
          src: '${src}',
          ${includeLogoOptionsStr}
        }}`)
        } else {
          setLogoStr(`logo={{
          src: '${src}',
        }}`)
        }
      }

      if (includeOptions) {
        setIncludeOptionsStr(`options={{
          level: '${selectedLevel}',
          margin: ${margin},
          scale: ${scale},
          width: ${width},
          color: {
            dark: '${darkColor}',
            light: '${lightColor}',
          },
        }}`)
      }

      if (includeOptionsStr) {
        if (includeLogo) {
          setComponentStr(`<Canvas
        text='${text}'
        ${includeOptionsStr}
        ${logoStr}
      />`)
        } else {
          setComponentStr(`<Canvas
        text='${text}'
        ${includeOptionsStr}
      />`)
        }
      } else {
        if (includeLogo) {
          setComponentStr(`<Canvas
        text='${text}'
        ${logoStr}
      />`)
        } else {
          setComponentStr(`<Canvas
        text='${text}'
      />`)
        }
      }
    } else if (selectedRenderAs === 'svg') {
      setSelectedRenderAsStr('SVG')

      if (includeOptions) {
        setIncludeOptionsStr(`options={{
          margin: ${margin},
          width: ${width},
          color: {
            dark: '${darkColor}',
            light: '${lightColor}',
          },
        }}`)

        setComponentStr(`<SVG
        text='${text}'
        ${includeOptionsStr}
      />`)
      } else {
        setComponentStr(`<SVG
        text='${text}'
      />`)
      }
    } else {
      setSelectedRenderAsStr('Image')

      if (includeOptions) {
        setIncludeOptionsStr(`options={{
          level: '${selectedLevel}',
          margin: ${margin},
          scale: ${scale},
          width: ${width},
          color: {
            dark: '${darkColor}',
            light: '${lightColor}',
          },
        }}`)

        setComponentStr(`<Image
        text='${text}'
        ${includeOptionsStr}
      />`)
      } else {
        setComponentStr(`<Image
        text='${text}'
      />`)
      }
    }

    highlightAll()
  }, [
    selectedType,
    selectedLevel,
    selectedRenderAs,
    displayDarkColorPicker,
    darkColor,
    displayLightColorPicker,
    lightColor,
    text,
    margin,
    scale,
    quality,
    width,
    includeOptions,
    src,
    includeLogo,
    includeLogoOptions,
    widthLogo,
    x,
    y,
  ])

  return (
    <>
      <section className={styles.section}>
        <div className={styles.row}>
          <label>Render:</label>
        </div>
        <div className={styles.row}>
          <select onChange={(e: any) => setSelectedRenderAs(e.target.value)} className={styles.select}>
            <option value="canvas">Canvas</option>
            <option value="img">Image</option>
            <option value="svg">SVG</option>
          </select>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.row}>
          <label>Text:</label>
        </div>
        <input
          type="text"
          name="text"
          value={text}
          onChange={(e: any) => setText(e.target.value)}
        />
      </section>
      <section className={styles.section}>
        <div className={styles.row}>
          <label>Include Options:</label>
          <input
            type="checkbox"
            defaultChecked
            onChange={(e: any) => setIncludeOptions(e.target.checked)}
          />
        </div>
      </section>
      <fieldset className={styles.fieldset}>
        <legend>Options</legend>
        {selectedRenderAs === 'img' && (
          <>
            <label>Type:</label>
            <select
              disabled={!includeOptions}
              onChange={(e: any) => setSelectedType(e.target.value)}
            >
              <option value="image/png">image/png</option>
              <option value="image/jpeg">image/jpeg</option>
              <option value="image/webp">image/webp</option>
            </select>
            <br />
            <label>Quality:</label>
            <input
              type="number"
              min="0"
              max="1"
              disabled={includeOptions ? false : true}
              value={quality}
              step={0.1}
              onChange={(e: any) => setQuality(e.target.value)}
            />
          </>
        )}
        <br />
        {selectedRenderAs !== 'svg' && (
          <>
            <label>Level:</label>
            <select
              disabled={!includeOptions}
              onChange={(e: any) => setSelectedLevel(e.target.value)}
            >
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="Q">Q</option>
              <option value="H">H</option>
            </select>
          </>
        )}
        <br />
        <label>Margin:</label>
        <input
          type="number"
          min="0"
          disabled={!includeOptions}
          value={margin}
          onChange={(e: any) => setMargin(e.target.value)}
        />
        <br />
        {selectedRenderAs !== 'svg' && (
          <>
            <label>Scale:</label>
            <input
              type="number"
              min="0"
              disabled={!includeOptions}
              value={scale}
              onChange={(e: any) => setScale(e.target.value)}
            />
          </>
        )}
        <br />
        <label>Width:</label>
        <input
          type="number"
          min="0"
          disabled={!includeOptions}
          value={width}
          onChange={(e: any) => setWidth(e.target.value)}
        />
        <br />
        <label>Dark Color:</label>
        <div
          style={disabled}
          onClick={() => setDisplayDarkColorPicker(!displayDarkColorPicker)}
        >
          <div
            style={{
              width: '100%',
              height: '29px',
              borderRadius: '2px',
              background: `${darkColor}`,
            }}
          />
        </div>
        {displayDarkColorPicker && (
          <div style={{ position: 'absolute', zIndex: '2' }}>
            <div
              style={{
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              }}
              onClick={() => setDisplayDarkColorPicker(false)}
            />
            <SketchPicker
              color={darkColor}
              onChange={(color) => setDarkColor(color.hex)}
            />
          </div>
        )}
        <br />
        <label>Light Color:</label>
        <div
          style={disabled}
          onClick={() => setDisplayLightColorPicker(!displayLightColorPicker)}
        >
          <div
            style={{
              width: '100%',
              height: '29px',
              borderRadius: '2px',
              backgroundColor: `${lightColor}`,
            }}
          />
        </div>
        {displayLightColorPicker && (
          <div style={{ position: 'absolute', zIndex: '2' }}>
            <div
              style={{
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              }}
              onClick={() => setDisplayLightColorPicker(false)}
            />
            <SketchPicker
              color={lightColor}
              onChange={(color) => setLightColor(color.hex)}
            />
          </div>
        )}
      </fieldset>
      <br />
      {selectedRenderAs === 'canvas' && (
        <>
          <label>Include Logo:</label>
          <input
            type="checkbox"
            defaultChecked
            onChange={(e: any) => setIncludeLogo(e.target.checked)}
          />
          <fieldset
            style={{
              border: '1px solid #ccc',
              borderRadius: 5,
              padding: 20,
            }}
          >
            <legend>Logo</legend>
            <label>Source:</label>
            <input
              type="text"
              disabled={!includeLogo}
              value={src}
              onChange={(e: any) => setSrc(e.target.value)}
            />
            <br />
            <label>Include Options:</label>
            <input
              type="checkbox"
              disabled={!includeLogo}
              defaultChecked
              onChange={(e: any) => setIncludeLogoOptions(e.target.checked)}
            />
            <br />
            <fieldset
              style={{
                border: '1px solid #ccc',
                borderRadius: 5,
                padding: 20,
              }}
            >
              <legend>Options</legend>
              <label>Width:</label>
              <input
                type="number"
                min="0"
                disabled={!includeLogoOptions || !includeLogo}
                value={widthLogo}
                onChange={(e: any) => setWidthLogo(e.target.value)}
              />
              <br />
              <label>Center Logo:</label>
              <input
                type="checkbox"
                disabled={!includeLogoOptions || !includeLogo}
                defaultChecked
                onChange={(e: any) => setCenterLogo(e.target.checked)}
              />
              <br />
              <fieldset
                style={{
                  border: '1px solid #ccc',
                  borderRadius: 5,
                  padding: 20,
                }}
              >
                <legend>X, Y Setting</legend>
                <label>X:</label>
                <input
                  type="number"
                  min="0"
                  disabled={!includeLogoOptions || !includeLogo || !centerLogo}
                  value={x}
                  onChange={(e: any) => setX(e.target.value)}
                />
                <br />
                <label>Y:</label>
                <input
                  type="number"
                  min="0"
                  disabled={!includeLogoOptions || !includeLogo || !centerLogo}
                  value={y}
                  onChange={(e: any) => setY(e.target.value)}
                />
              </fieldset>
            </fieldset>
          </fieldset>
        </>
      )}
      <br />
      {selectedRenderAs === 'canvas' &&
        (includeOptions ? (
          includeLogo ? (
            includeLogoOptions ? (
              <Canvas
                text={text}
                options={{
                  level: selectedLevel,
                  margin: margin,
                  scale: scale,
                  width: width,
                  color: {
                    dark: darkColor,
                    light: lightColor,
                  },
                }}
                logo={{
                  src: src,
                  options: {
                    width: widthLogo,
                    x: x,
                    y: y,
                  },
                }}
              />
            ) : (
              <Canvas
                text={text}
                options={{
                  level: selectedLevel,
                  margin: margin,
                  scale: scale,
                  width: width,
                  color: {
                    dark: darkColor,
                    light: lightColor,
                  },
                }}
                logo={{
                  src: src,
                }}
              />
            )
          ) : (
            <Canvas
              text={text}
              options={{
                level: selectedLevel,
                margin: margin,
                scale: scale,
                width: width,
                color: {
                  dark: darkColor,
                  light: lightColor,
                },
              }}
            />
          )
        ) : (
          <Canvas text={text} />
        ))}
      {selectedRenderAs === 'img' &&
        (includeOptions ? (
          <Image
            text={text}
            options={{
              type: selectedType,
              quality: quality,
              level: selectedLevel,
              margin: margin,
              scale: scale,
              width: width,
              color: {
                dark: darkColor,
                light: lightColor,
              },
            }}
          />
        ) : (
          <Image text={text} />
        ))}
      {selectedRenderAs === 'svg' &&
        (includeOptions ? (
          <SVG
            text={text}
            options={{
              margin: margin,
              width: width,
              color: {
                dark: darkColor,
                light: lightColor,
              },
            }}
          />
        ) : (
          <Image text={text} />
        ))}
      <br />

      <Code>
        {`import React from 'react';
import { useQRCode } from 'next-qrcode';

function App() {
  const { ${selectedRenderAsStr} } = useQRCode();

  return (
    ${componentStr}
  );
}
`}
      </Code>
    </>
  )
}
