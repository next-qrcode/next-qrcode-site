import React, { useState, CSSProperties, useEffect } from 'react'
import type { NextPage } from 'next'
import {
  Container,
  Stack,
  Box,
  Input,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Center,
  Text,
} from '@chakra-ui/react'
import Select from 'react-select'
import { SketchPicker } from 'react-color'
import { useQRCode } from 'next-qrcode'
import { usePrism } from 'next-prism'

import 'next-prism/themes/tomorrow.css'

const typeOptions = [
  { value: 'image/png', label: 'image/png' },
  { value: 'image/jpeg', label: 'image/jpeg' },
  { value: 'image/webp', label: 'image/webp' },
]

const levelOptions = [
  { value: 'L', label: 'L' },
  { value: 'M', label: 'M' },
  { value: 'Q', label: 'Q' },
  { value: 'H', label: 'H' },
]

const renderAsOptions = [
  { value: 'canvas', label: 'Canvas' },
  { value: 'svg', label: 'SVG' },
  { value: 'img', label: 'Image' },
]

const Home: NextPage = () => {
  const { Code, highlightAll } = usePrism()
  const { Canvas, SVG, Image } = useQRCode()
  const [selectedType, setSelectedType] = useState({
    value: 'image/png',
    label: 'image/png',
  })
  const [selectedLevel, setSelectedLevel] = useState({ value: 'L', label: 'L' })
  const [selectedRenderAs, setSelectedRenderAs] = useState({
    value: 'canvas',
    label: 'Canvas',
  })
  const [displayDarkColorPicker, setDisplayDarkColorPicker] = useState(false)
  const [darkColor, setDarkColor] = useState('#010599FF')
  const [displayLightColorPicker, setDisplayLightColorPicker] = useState(false)
  const [lightColor, setLightColor] = useState('#FFBF60FF')
  const [text, setText] = useState('https://github.com/Bunlong/next-qrcode')
  const [margin, setMargin] = useState(2)
  const [scale, setScale] = useState(5)
  const [quality, setQuality] = useState(0.3)
  const [width, setWidth] = useState(150)
  const [includeOptions, setIncludeOptions] = useState(true)
  const [src, setSrc] = useState('https://next-qrcode.js.org/github.png')
  const [includeLogo, setIncludeLogo] = useState(true)
  const [includeLogoOptions, setIncludeLogoOptions] = useState(true)
  const [widthLogo, setWidthLogo] = useState(35)
  const [x, setX] = useState(1)
  const [y, setY] = useState(1)
  const [centerLogo, setCenterLogo] = useState(true)

  const handleClickDark = () => {
    setDisplayDarkColorPicker(!displayDarkColorPicker)
  }

  const handleCloseDark = () => {
    setDisplayDarkColorPicker(false)
  }

  const handleChangeDark = (color: any) => {
    setDarkColor(color.hex)
  }

  const handleChangeType = (selectedType: any) => {
    setSelectedType(selectedType)
  }

  const handleChangeLevel = (selectedLevel: any) => {
    setSelectedLevel(selectedLevel)
  }

  const handleChangeRenderAs = (selectedRenderAs: any) => {
    setSelectedRenderAs(selectedRenderAs)
  }

  const handleClickLight = () => {
    setDisplayLightColorPicker(!displayLightColorPicker)
  }

  const handleCloseLight = () => {
    setDisplayLightColorPicker(false)
  }

  const handleChangeLight = (color: any) => {
    setLightColor(color.hex)
  }

  const handleChange = (event: any) => {
    const name = event.target.name
    if (name === 'text') {
      setText(event.target.value)
    } else if (name === 'src') {
      setSrc(event.target.value)
    }
  }

  const handleChangeCheckbox = (event: any) => {
    const name = event.target.name
    if (name === 'include-options') {
      setIncludeOptions(event.target.checked)
    } else if (name === 'include-logo') {
      setIncludeLogo(event.target.checked)
    } else if (name === 'include-logo-options') {
      setIncludeLogoOptions(event.target.checked)
    } else if (name === 'center-logo') {
      setCenterLogo(event.target.checked)
      if (centerLogo) {
        setX(1)
        setY(1)
      } else {
        setX(0)
        setY(0)
      }
    }
  }

  useEffect(() => {
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

  const handleChangeNumberInput = (event: any) => {
    const name = event.target.name
    if (name === 'margin') {
      setMargin(event.target.value)
    } else if (name === 'quality') {
      setQuality(event.target.value)
    } else if (name === 'scale') {
      setScale(event.target.value)
    } else if (name === 'width') {
      setWidth(event.target.value)
    } else if (name === 'width-logo') {
      setWidthLogo(event.target.value)
    } else if (name === 'x') {
      setX(event.target.value)
    } else if (name === 'y') {
      setY(event.target.value)
    }
  }

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

  return (
    <>
      <Box bg={'white'} px={4} color="black" borderBottom="1px solid #CCC">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Text fontSize="2xl">next-qrcode</Text>
          </Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <span>
                <iframe
                  src="https://ghbtns.com/github-btn.html?user=Bunlong&repo=next-qrcode&type=star&count=true&size=large"
                  scrolling="0"
                  width="170"
                  height="30"
                  title="GitHub"
                ></iframe>
              </span>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Container maxW="container.md" paddingBottom="50" marginTop={10}>
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Box>
              <label>Render:</label>
            </Box>
            <Box>
              <Select
                value={selectedRenderAs}
                onChange={handleChangeRenderAs}
                options={renderAsOptions}
              />
            </Box>
          </Stack>
          <Stack spacing={3}>
            <Box>
              <label>Text:</label>
            </Box>
            <Box>
              <Input
                variant="outline"
                name="text"
                value={text}
                onChange={handleChange}
              />
            </Box>
          </Stack>

          <Stack spacing={3} direction="row">
            <Box>
              <label>Include Options:</label>
            </Box>
            <Box style={{ marginTop: '4px' }}>
              <Checkbox
                name="include-options"
                defaultChecked
                onChange={handleChangeCheckbox}
              />
            </Box>
          </Stack>
          <Stack spacing={3}>
            <fieldset
              style={{ border: '1px solid #ccc', borderRadius: 5, padding: 20 }}
            >
              <legend>Options</legend>
              <Stack spacing={6}>
                {selectedRenderAs.value !== 'canvas' && (
                  <>
                    <Stack spacing={3}>
                      <Box>
                        <label>Type:</label>
                      </Box>
                      <Box>
                        <Select
                          value={selectedType}
                          onChange={handleChangeType}
                          options={typeOptions}
                          isDisabled={!includeOptions}
                        />
                      </Box>
                    </Stack>
                    <Stack spacing={3}>
                      <Box>
                        <label>Quality:</label>
                      </Box>
                      <Box>
                        <NumberInput
                          defaultValue={quality}
                          min={0}
                          max={1}
                          step={0.1}
                          name="quality"
                          value={quality}
                          onChange={(value) =>
                            handleChangeNumberInput({
                              target: { name: 'quality', value },
                            })
                          }
                          isDisabled={includeOptions ? false : true}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
                    </Stack>
                  </>
                )}
                <Stack spacing={3}>
                  <Box>
                    <label>Level:</label>
                  </Box>
                  <Box>
                    <Select
                      value={selectedLevel}
                      onChange={handleChangeLevel}
                      options={levelOptions}
                      isDisabled={!includeOptions}
                    />
                  </Box>
                </Stack>
                <Stack spacing={3}>
                  <Box>
                    <label>Margin:</label>
                  </Box>
                  <Box>
                    <NumberInput
                      defaultValue={margin}
                      min={0}
                      name="margin"
                      value={margin}
                      isDisabled={!includeOptions}
                      onChange={(value) =>
                        handleChangeNumberInput({
                          target: { name: 'margin', value },
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </Stack>
                <Stack spacing={3}>
                  <Box>
                    <label>Scale:</label>
                  </Box>
                  <Box>
                    <NumberInput
                      defaultValue={scale}
                      min={0}
                      name="scale"
                      value={scale}
                      isDisabled={!includeOptions}
                      onChange={(value) =>
                        handleChangeNumberInput({
                          target: { name: 'scale', value },
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </Stack>
                <Stack spacing={3}>
                  <Box>
                    <label>Width:</label>
                  </Box>
                  <Box>
                    <NumberInput
                      defaultValue={width}
                      min={0}
                      name="width"
                      value={width}
                      isDisabled={!includeOptions}
                      onChange={(value) =>
                        handleChangeNumberInput({
                          target: { name: 'width', value },
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </Stack>
                <Stack spacing={3}>
                  <Box>
                    <label>Dark Color:</label>
                  </Box>
                  <Box>
                    <div style={disabled} onClick={handleClickDark}>
                      <div
                        style={{
                          width: '100%',
                          height: '29px',
                          borderRadius: '2px',
                          background: `${darkColor}`,
                        }}
                      />
                    </div>
                    {displayDarkColorPicker ? (
                      <div style={{ position: 'absolute', zIndex: '2' }}>
                        <div
                          style={{
                            position: 'fixed',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            left: '0px',
                          }}
                          onClick={handleCloseDark}
                        />
                        <SketchPicker
                          color={darkColor}
                          onChange={handleChangeDark}
                        />
                      </div>
                    ) : null}
                  </Box>
                </Stack>
                <Stack spacing={3}>
                  <Box>
                    <label>Light Color:</label>
                  </Box>
                  <Box>
                    <div style={disabled} onClick={handleClickLight}>
                      <div
                        style={{
                          width: '100%',
                          height: '29px',
                          borderRadius: '2px',
                          backgroundColor: `${lightColor}`,
                        }}
                      />
                    </div>
                    {displayLightColorPicker ? (
                      <div style={{ position: 'absolute', zIndex: '2' }}>
                        <div
                          style={{
                            position: 'fixed',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            left: '0px',
                          }}
                          onClick={handleCloseLight}
                        />
                        <SketchPicker
                          color={lightColor}
                          onChange={handleChangeLight}
                        />
                      </div>
                    ) : null}
                  </Box>
                </Stack>
              </Stack>
            </fieldset>
          </Stack>
          <Stack spacing={3}>
            {selectedRenderAs.value === 'canvas' && (
              <Stack spacing={6}>
                <Stack spacing={3} direction="row">
                  <Box>
                    <label>Include Logo:</label>
                  </Box>
                  <Box style={{ marginTop: '4px' }}>
                    <Checkbox
                      isDisabled={!includeOptions}
                      name="include-logo"
                      defaultChecked
                      onChange={handleChangeCheckbox}
                    />
                  </Box>
                </Stack>
                <fieldset
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: 5,
                    padding: 20,
                  }}
                >
                  <legend>Logo</legend>
                  <Stack spacing={3}>
                    <Box>
                      <Stack spacing={6}>
                        <Stack spacing={3}>
                          <Box>
                            <label>Source:</label>
                          </Box>
                          <Box>
                            <Input
                              variant="outline"
                              isDisabled={!includeOptions || !includeLogo}
                              name="src"
                              value={src}
                              onChange={handleChange}
                            />
                          </Box>
                        </Stack>
                        <Stack spacing={3} direction="row">
                          <Box>
                            <label>Include Options:</label>
                          </Box>
                          <Box style={{ marginTop: '4px' }}>
                            <Checkbox
                              isDisabled={!includeOptions || !includeLogo}
                              name="include-logo-options"
                              defaultChecked
                              onChange={handleChangeCheckbox}
                            />
                          </Box>
                        </Stack>
                        <Stack spacing={3}>
                          <fieldset
                            style={{
                              border: '1px solid #ccc',
                              borderRadius: 5,
                              padding: 20,
                            }}
                          >
                            <legend>Options</legend>
                            <Stack spacing={6}>
                              <Stack spacing={3}>
                                <Box>
                                  <label>Width:</label>
                                </Box>
                                <Box>
                                  <NumberInput
                                    defaultValue={widthLogo}
                                    min={0}
                                    name="width-logo"
                                    value={widthLogo}
                                    isDisabled={
                                      !includeLogoOptions ||
                                      !includeOptions ||
                                      !includeLogo
                                    }
                                    onChange={(value) =>
                                      handleChangeNumberInput({
                                        target: {
                                          name: 'width-logo',
                                          value,
                                        },
                                      })
                                    }
                                  >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </Box>
                              </Stack>
                              <Stack spacing={3} direction="row">
                                <Box>
                                  <label>Center Logo:</label>
                                </Box>
                                <Box style={{ marginTop: '4px' }}>
                                  <Checkbox
                                    isDisabled={
                                      !includeLogoOptions ||
                                      !includeOptions ||
                                      !includeLogo
                                    }
                                    name="center-logo"
                                    defaultChecked
                                    onChange={handleChangeCheckbox}
                                  />
                                </Box>
                              </Stack>
                              <fieldset
                                style={{ border: '1px solid #ccc', borderRadius: 5, padding: 20 }}
                              >
                                <legend>X, Y Setting</legend>
                                <Stack spacing={3}>
                                  <Box>
                                    <label>X:</label>
                                  </Box>
                                  <Box>
                                    <NumberInput
                                      defaultValue={x}
                                      min={0}
                                      name="x"
                                      value={x}
                                      isDisabled={
                                        !includeLogoOptions ||
                                        !includeOptions ||
                                        !includeLogo ||
                                        centerLogo
                                      }
                                      onChange={(value) =>
                                        handleChangeNumberInput({
                                          target: { name: 'x', value },
                                        })
                                      }
                                    >
                                      <NumberInputField />
                                      <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                      </NumberInputStepper>
                                    </NumberInput>
                                  </Box>
                                
                              </Stack>
                                <Stack spacing={3}>
                                <Box>
                                  <label>Y:</label>
                                </Box>
                                <Box>
                                  <NumberInput
                                    defaultValue={y}
                                    min={0}
                                    name="y"
                                    value={y}
                                    isDisabled={
                                      !includeLogoOptions ||
                                      !includeOptions ||
                                      !includeLogo ||
                                      centerLogo
                                    }
                                    onChange={(value) =>
                                      handleChangeNumberInput({
                                        target: { name: 'y', value },
                                      })
                                    }
                                  >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </Box>
                              </Stack>
                              </fieldset>
                            </Stack>
                          </fieldset>
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </fieldset>
              </Stack>
            )}
          </Stack>
          <Stack>
            <Stack spacing={3} paddingTop={30} paddingBottom={30}>
              <Center>
                <Box>
                  {selectedRenderAs.value === 'canvas' &&
                    (includeOptions ? (
                      includeLogo ? (
                        includeLogoOptions ? (
                          <Canvas
                            text={text}
                            options={{
                              level: selectedLevel.value,
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
                              level: selectedLevel.value,
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
                            level: selectedLevel.value,
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
                  {selectedRenderAs.value === 'img' &&
                    (includeOptions ? (
                      <Image
                        text={text}
                        options={{
                          type: selectedType.value,
                          quality: quality,
                          level: selectedLevel.value,
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
                </Box>
              </Center>
            </Stack>
          </Stack>
          <Stack>
            <Stack spacing={3}>
              <Box>
                <Code language="javascript">
                  {`import React from 'react';
import { useQRCode } from 'next-qrcode';

function App() {
  const { ${
    selectedRenderAs.value === 'canvas' ? 'Canvas' : 'Image'
  } } = useQRCode();

  return (
    ${
      selectedRenderAs.value === 'canvas'
        ? includeLogo
          ? `<Canvas
      text='${text}'
      ${
        includeOptions
          ? `options: {{
        level: '${selectedLevel.value}',
        margin: ${margin},
        scale: ${scale},
        width: ${width},
        color: {
          dark: '${darkColor}',
          light: '${lightColor}',
        }
      }}
      logo: {{
        src: '${src}',
        ${
          includeLogoOptions
            ? `options: {
          width: ${widthLogo},
          x: ${x},
          y: ${y},
        }`
            : ''
        }
      }}`
          : ''
      }
    />`
          : `<Canvas
      text='${text}'
      ${
        includeOptions
          ? `options: {{
        level: '${selectedLevel.value}',
        margin: ${margin},
        scale: ${scale},
        width: ${width},
        color: {
          dark: '${darkColor}',
          light: '${lightColor}',
        }
      }}`
        : ''
    }
    />`
        : `<Image
      text='${text}'
      ${
        includeOptions
          ? `options: {{
        type: 'image/jpeg',
        quality: 0.3,
        level: '${selectedLevel.value}',
        margin: ${margin},
        scale: ${scale},
        width: ${width},
        color: {
          dark: '${darkColor}',
          light: '${lightColor}',
        }
      }}`
          : ''
      }
    />`
    }
  );
}

export default App;`}
                </Code>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

export default Home
