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
  const [x, setX] = useState<any>(0)
  const [y, setY] = useState<any>(0)
  const [selectedRenderAsStr, setSelectedRenderAsStr] = useState<string>('')
  const [componentStr, setComponentStr] = useState<string>('')

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

      let str = ''

      if (includeOptions) {
        str += `options={{
        level: '${selectedLevel}',
        margin: ${margin},
        scale: ${scale},
        width: ${width},
        color: {
          dark: '${darkColor}',
          light: '${lightColor}',
        },
      }}`
      }

      if (includeLogo) {
        if (includeOptions) {
          str += `
      logo={{
        src: '${src}',
      `
        } else {
          str += `logo={{
      src: '${src}',
      `
        }

        if (includeLogoOptions) {
          if (centerLogo) {
            str += `  options: {
          width: ${widthLogo},
          x: undefined,
          y: undefined,
        }
      }}`
          } else {
            str += `  options: {
          width: ${widthLogo},
          x: ${x},
          y: ${y},
        }
      }}`
          }
        } else {
          str += `}}`
        }
      }

      if (str) {
        setComponentStr(`<Canvas
      text='${text}'
      ${str}
    />`)
      } else {
        setComponentStr(`<Canvas
      text='${text}'
    />`)
      }
    } else if (selectedRenderAs === 'svg') {
      setSelectedRenderAsStr('SVG')

      let str = ''

      if (includeOptions) {
        str += `options={{
        margin: ${margin},
        width: ${width},
        color: {
          dark: '${darkColor}',
          light: '${lightColor}',
        },
      }}`
      }
      if (str) {
        setComponentStr(`<SVG
      text='${text}'
      ${str}
    />`)
      } else {
        setComponentStr(`<SVG
      text='${text}'
    />`)
      }
    } else {
      setSelectedRenderAsStr('Image')

      let str = ''

      if (includeOptions) {
        str = `options={{
        level: '${selectedLevel}',
        margin: ${margin},
        scale: ${scale},
        width: ${width},
        color: {
          dark: '${darkColor}',
          light: '${lightColor}',
        },
      }}`
      }

      if (str) {
        setComponentStr(`<Image
      text='${text}'
      ${str}
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
    centerLogo,
    x,
    y,
  ])

  return (
    <>
      <section className={styles.section}>
        <div className={styles.row}>
          <label>Render</label>
        </div>
        <div className={styles.row}>
          <select
            className={styles.control}
            onChange={(e: any) => setSelectedRenderAs(e.target.value)}
          >
            <option value='canvas'>Canvas</option>
            <option value='img'>Image</option>
            <option value='svg'>SVG</option>
          </select>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.row}>
          <label>Text</label>
        </div>
        <input
          className={styles.control}
          type='text'
          name='text'
          value={text}
          onChange={(e: any) => setText(e.target.value)}
        />
      </section>
      <section className={styles.section}>
        <div className={styles.row}>
          <label>Include Options</label>
          &nbsp;
          <input
            type='checkbox'
            defaultChecked
            onChange={(e: any) => setIncludeOptions(e.target.checked)}
          />
        </div>
      </section>
      <fieldset className={styles.fieldset}>
        <legend>Options</legend>
        {selectedRenderAs === 'img' && (
          <>
            <section className={styles.section}>
              <div className={styles.row}>
                <label>Type</label>
              </div>
              <select
                className={styles.control}
                disabled={!includeOptions}
                onChange={(e: any) => setSelectedType(e.target.value)}
              >
                <option value='image/png'>image/png</option>
                <option value='image/jpeg'>image/jpeg</option>
                <option value='image/webp'>image/webp</option>
              </select>
            </section>
            <section className={styles.section}>
              <div className={styles.row}>
                <label>Quality</label>
              </div>
              <input
                className={styles.control}
                type='number'
                min='0'
                max='1'
                disabled={includeOptions ? false : true}
                value={quality}
                step={0.1}
                onChange={(e: any) => setQuality(e.target.value)}
              />
            </section>
          </>
        )}
        {selectedRenderAs !== 'svg' && (
          <section className={styles.section}>
            <div className={styles.row}>
              <label>Level</label>
            </div>
            <select
              className={styles.control}
              disabled={!includeOptions}
              onChange={(e: any) => setSelectedLevel(e.target.value)}
            >
              <option value='L'>L</option>
              <option value='M'>M</option>
              <option value='Q'>Q</option>
              <option value='H'>H</option>
            </select>
          </section>
        )}
        <section className={styles.section}>
          <div className={styles.row}>
            <label>Margin</label>
          </div>
          <input
            className={styles.control}
            type='number'
            min='0'
            disabled={!includeOptions}
            value={margin}
            onChange={(e: any) => setMargin(e.target.value)}
          />
        </section>
        {selectedRenderAs !== 'svg' && (
          <section className={styles.section}>
            <div className={styles.row}>
              <label>Scale</label>
            </div>
            <input
              className={styles.control}
              type='number'
              min='0'
              disabled={!includeOptions}
              value={scale}
              onChange={(e: any) => setScale(e.target.value)}
            />
          </section>
        )}
        <section className={styles.section}>
          <div className={styles.row}>
            <label>Width</label>
          </div>
          <input
            className={styles.control}
            type='number'
            min='0'
            disabled={!includeOptions}
            value={width}
            onChange={(e: any) => setWidth(e.target.value)}
          />
        </section>
        <section className={styles.section}>
          <div className={styles.row}>
            <label>Dark Color</label>
          </div>
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
        </section>
        <section className={styles.section}>
          <div className={styles.row}>
            <label>Light Color</label>
          </div>
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
        </section>
      </fieldset>
      <br />
      {selectedRenderAs === 'canvas' && (
        <>
          <section className={styles.section}>
            <div className={styles.row}>
              <label>Include Logo</label>
              &nbsp;
              <input
                type='checkbox'
                defaultChecked
                onChange={(e: any) => setIncludeLogo(e.target.checked)}
              />
            </div>
          </section>
          <fieldset className={styles.fieldset}>
            <legend>Logo</legend>
            <section className={styles.section}>
              <div className={styles.row}>
                <label>Source</label>
              </div>
              <input
                className={styles.control}
                type='text'
                disabled={!includeLogo}
                value={src}
                onChange={(e: any) => setSrc(e.target.value)}
              />
            </section>
            <section className={styles.section}>
              <div className={styles.row}>
                <label>Include Options</label>
                &nbsp;
                <input
                  type='checkbox'
                  disabled={!includeLogo}
                  defaultChecked
                  onChange={(e: any) => setIncludeLogoOptions(e.target.checked)}
                />
              </div>
            </section>
            <fieldset className={styles.fieldset}>
              <legend>Options</legend>
              <section className={styles.section}>
                <div className={styles.row}>
                  <label>Width</label>
                </div>
                <input
                  className={styles.control}
                  type='number'
                  min='0'
                  disabled={!includeLogoOptions || !includeLogo}
                  value={widthLogo}
                  onChange={(e: any) => setWidthLogo(e.target.value)}
                />
              </section>
              <section className={styles.section}>
                <div className={styles.row}>
                  <label>Center Logo</label>
                  &nbsp;
                  <input
                    type='checkbox'
                    disabled={!includeLogoOptions || !includeLogo}
                    defaultChecked
                    onChange={(e: any) => setCenterLogo(e.target.checked)}
                  />
                </div>
              </section>
              <fieldset className={styles.fieldset}>
                <legend>X, Y Setting</legend>
                <section className={styles.section}>
                  <div className={styles.row}>
                    <label>X</label>
                  </div>
                  {includeLogo && includeLogoOptions && centerLogo ? (
                    <input
                      className={styles.control}
                      type='text'
                      disabled={includeLogo || includeLogoOptions || centerLogo}
                      value={'undefined'}
                    />
                  ) : (
                    <input
                      className={styles.control}
                      type='number'
                      min='0'
                      disabled={!includeLogo || !includeLogoOptions}
                      value={x}
                      onChange={(e: any) => setX(e.target.value)}
                    />
                  )}
                </section>
                <section className={styles.section}>
                  <div className={styles.row}>
                    <label>Y</label>
                  </div>
                  {includeLogo && includeLogoOptions && centerLogo ? (
                    <input
                      className={styles.control}
                      type='text'
                      disabled={includeLogo || includeLogoOptions || centerLogo}
                      value={'undefined'}
                    />
                  ) : (
                    <input
                      className={styles.control}
                      type='number'
                      min='0'
                      disabled={!includeLogo || !includeLogoOptions}
                      value={y}
                      onChange={(e: any) => setY(e.target.value)}
                    />
                  )}
                </section>
              </fieldset>
            </fieldset>
          </fieldset>
        </>
      )}
      <br />
      {selectedRenderAs === 'canvas' && !includeOptions && !includeLogo && (
        <Canvas text={text} />
      )}
      {selectedRenderAs === 'canvas' &&
        includeOptions &&
        !includeLogo &&
        !includeLogoOptions &&
        !centerLogo && (
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
        )}
      {selectedRenderAs === 'canvas' &&
        includeOptions &&
        includeLogo &&
        !includeLogoOptions &&
        !centerLogo && (
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
        )}
      {selectedRenderAs === 'canvas' &&
        includeOptions &&
        includeLogo &&
        includeLogoOptions &&
        !centerLogo && (
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
        )}
      {selectedRenderAs === 'canvas' &&
        includeOptions &&
        includeLogo &&
        includeLogoOptions &&
        centerLogo && (
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
                x: undefined,
                y: undefined,
              },
            }}
          />
        )}
      {selectedRenderAs === 'canvas' && includeOptions && !includeLogo && (
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
      )}
      {selectedRenderAs === 'canvas' &&
        !includeOptions &&
        includeLogo &&
        includeLogoOptions &&
        centerLogo && (
          <Canvas
            text={text}
            logo={{
              src: src,
              options: {
                width: widthLogo,
                x: undefined,
                y: undefined,
              },
            }}
          />
        )}
      {selectedRenderAs === 'canvas' &&
        !includeOptions &&
        includeLogo &&
        includeLogoOptions &&
        !centerLogo && (
          <Canvas
            text={text}
            logo={{
              src: src,
              options: {
                width: widthLogo,
                x: x,
                y: y,
              },
            }}
          />
        )}
      {selectedRenderAs === 'canvas' &&
        !includeOptions &&
        includeLogo &&
        !includeLogoOptions && (
          <Canvas
            text={text}
            logo={{
              src: src,
            }}
          />
        )}
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
