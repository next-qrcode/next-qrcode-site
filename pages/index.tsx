import React, { useState } from 'react'
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
} from '@chakra-ui/react'
import Select from 'react-select'
import { SketchPicker } from 'react-color'
import { useQRCode } from 'next-qrcode'

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
  { value: 'img', label: 'Image' },
]

const Home: NextPage = () => {
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
  const { Canvas, Image } = useQRCode()

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
    }
  }

  const handleChangeCheckbox = (event: any) => {
    setIncludeOptions(event.target.checked)
  }

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
    }
  }

  return (
    <>
      <Box bg={'black'} px={4} color="white">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>next-qrcode</Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Box>
                <span>
                  <iframe
                    src="https://ghbtns.com/github-btn.html?user=Bunlong&repo=next-qrcode&type=star&count=true"
                    frameBorder="0"
                    scrolling="0"
                    width="80px"
                    height="20px"
                  ></iframe>
                </span>
              </Box>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Container maxW="container.md" paddingBottom="50" marginTop="50">
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Box>
              <label>Render as:</label>
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
          <Stack spacing={3}>
            <Box>
              <label>Include Options:</label>
            </Box>
            <Box>
              <Checkbox defaultChecked onChange={handleChangeCheckbox} />
            </Box>
          </Stack>
          <Stack spacing={3}>
            <fieldset>
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
                      isDisabled={includeOptions ? false : true}
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
                      isDisabled={includeOptions ? false : true}
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
                      isDisabled={includeOptions ? false : true}
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
                    <label>Dark color:</label>
                  </Box>
                  <Box>
                    <div
                      style={{
                        width: '100%',
                        padding: '5px',
                        background: '#fff',
                        borderRadius: '1px',
                        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                        display: 'inline-block',
                        cursor: 'pointer',
                      }}
                      onClick={handleClickDark}
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
                    <label>Light color:</label>
                  </Box>
                  <Box>
                    <div
                      style={{
                        width: '100%',
                        padding: '5px',
                        background: '#fff',
                        borderRadius: '1px',
                        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                        display: 'inline-block',
                        cursor: 'pointer',
                      }}
                      onClick={handleClickLight}
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
                <Stack spacing={3}>
                  <Box>
                    {selectedRenderAs.value === 'canvas' ? (
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
                    ) : (
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
                    )}
                  </Box>
                </Stack>
                <Stack spacing={3}>
                  <Box>
                    <pre>
                      <code
                        style={{
                          backgroundColor: '#eee',
                          border: '1px solid #999',
                          display: 'block',
                          padding: '20px',
                        }}
                      >
                        {`import React from 'react';
import { useQRCode } from 'next-qrcode';

function App() {
  const { ${
    selectedRenderAs.value === 'canvas' ? 'Canvas' : 'Image'
  } } = useQRCode();

  return (
    ${
      selectedRenderAs.value === 'canvas'
        ? `<Canvas
      text='${text}'
      ${
        includeOptions
          ? `options: {
        level: '${selectedLevel.value}',
        margin: ${margin},
        scale: ${scale},
        width: ${width},
        color: {
          dark: '${darkColor}',
          light: '${lightColor}',
        }
      }`
          : ''
      }
    />`
        : `<Image
      text='${text}'
      ${
        includeOptions
          ? `options: {
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
      }`
          : ''
      }
    />`
    }
  );
}

export default App;`}
                      </code>
                    </pre>
                  </Box>
                </Stack>
              </Stack>
            </fieldset>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

export default Home
