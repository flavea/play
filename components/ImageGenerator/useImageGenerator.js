import { useEffect, useState } from 'react'
import { toJpeg } from 'html-to-image'
import {
  defaultBorderColor,
  defaultBorderRadius,
  defaultBorderSize,
  defaultBorderStyle,
  initialFilters,
  symbols,
} from './constants'

export const useImageGenerator = () => {
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(300)
  const [imageUrl, setImageUrl] = useState(
    'https://res.cloudinary.com/ilma/image/upload/v1629120513/cat_pkopg1.jpg',
  )
  const [ext, setExt] = useState('.jpg')
  const [style, setStyle] = useState({
    width,
    height,
    objectFit: 'cover',
    boxSizing: 'content-box',
  })

  const [filters, setFilters] = useState(initialFilters)
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [background, setBackground] = useState('')
  const [sameBorder, setSameBorder] = useState(false)
  const [borderSize, setBorderSize] = useState(defaultBorderSize)
  const [borderStyle, setBorderStyle] = useState(defaultBorderStyle)
  const [borderColor, setBorderColor] = useState(defaultBorderColor)
  const [sameRadius, setSameRadius] = useState(false)
  const [borderRadius, setBorderRadius] = useState(defaultBorderRadius)
  const [dropShadow, setDropShadow] = useState('#000000')
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [dropShadowBlur, setDropShadowBlur] = useState(0)
  const [overlay, setOverlay] = useState(false)
  const [overlayBlend, setOverlayBlend] = useState(false)
  const [overlayColor, setOverlayColor] = useState('#000000')
  const [overlayOpacity, setOverlayOpacity] = useState(0.6)
  const [resultUrl, setResultUrl] = useState(null)
  const dropShadowKey = 'drop-shadow'

  const reset = () => {
    setFilters(initialFilters)
    setCopied(false)
    setBackground('')
    setSameBorder(false)
    setBorderSize(defaultBorderSize)
    setBorderStyle(defaultBorderStyle)
    setBorderColor(defaultBorderColor)
    setSameRadius(false)
    setBorderRadius(defaultBorderRadius)
    setDropShadow('#000000')
    setOffsetX(0)
    setOffsetY(0)
    setDropShadowBlur(0)
    setOverlay(false)
    setOverlayBlend(false)
    setOverlayColor('#000000')
    setOverlayOpacity(0.6)
    setResultUrl(null)
  }

  const filterStringGen = () => {
    const keys = Object.keys(filters)
    const strings = keys
      .map((key) => {
        if (
          filters[key] != initialFilters[key] ||
          (key === dropShadowKey && !filters[key].includes(initialFilters[key]))
        ) {
          return `${key}(${filters[key]}${symbols[key] || ''})`
        } else return null
      })
      .filter((f) => f)

    const str = strings.join(' ')
    if (str.trim()) setStyle({ ...style, filter: str })
    else {
      deleteStyle('filter')
    }
  }

  const updateFilter = (label, value) => {
    setFilters({
      ...filters,
      [label]: value,
    })
    setCopied(false)
  }

  const updateBlend = (target, value) => {
    if (target === 'image') {
      setStyle({ ...style, mixBlendMode: value })
    } else {
      setOverlayBlend(value)
    }
  }

  const process = (e) => {
    const input = e.target
    const curFiles = input.files
    if (curFiles.length > 0) {
      var _URL = window.URL || window.webkitURL
      for (const file of curFiles) {
        var objectUrl = _URL.createObjectURL(file)
        setImageUrl(objectUrl)
      }
    }
  }

  const save = () => {
    setTimeout(() => {
      toJpeg(document.getElementById('image')).then(function (dataUrl) {
        setResultUrl(dataUrl)
      })
    }, 1000)
  }

  const deleteStyle = (prop) => {
    if (style[prop]) {
      const styleBaru = {
        ...style,
      }
      delete styleBaru[prop]
      setStyle(styleBaru)
    }
  }

  useEffect(filterStringGen, [filters, dropShadow])

  useEffect(() => {
    save()
    setCode(document.getElementById('image').innerHTML)
  }, [style])

  useEffect(() => {
    setStyle({
      ...style,
      width,
      height,
    })
  }, [width, height])

  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    if (sameBorder) {
      if (borderSize.left > 0) {
        setStyle({
          ...style,
          border: `${borderSize.left}px ${borderStyle.left} ${borderColor.left}`,
        })
      } else {
        deleteStyle('border')
      }
    } else {
      if (borderSize.left > 0) {
        setStyle({
          ...style,
          borderLeft: `${borderSize.left}px ${borderStyle.left} ${borderColor.left}`,
        })
      } else {
        deleteStyle('borderLeft')
      }
      if (borderSize.right > 0) {
        setStyle({
          ...style,
          borderRight: `${borderSize.right}px ${borderStyle.right} ${borderColor.right}`,
        })
      } else {
        deleteStyle('borderRight')
      }
      if (borderSize.top > 0) {
        setStyle({
          ...style,
          borderTop: `${borderSize.top}px ${borderStyle.top} ${borderColor.top}`,
        })
      } else {
        deleteStyle('borderTop')
      }
      if (borderSize.bottom > 0) {
        setStyle({
          ...style,
          borderBottom: `${borderSize.bottom}px ${borderStyle.bottom} ${borderColor.bottom}`,
        })
      } else {
        deleteStyle('borderBottom')
      }
    }
  }, [borderSize, borderColor, borderStyle, sameBorder])

  useEffect(() => {
    let img = new Image()
    img.onload = function () {
      if (this.width) setWidth(this.width)
      if (this.height) setHeight(this.height)
    }
    img.src = imageUrl

    if (imageUrl.includes('base64')) {
      setExt(
        imageUrl.substring('data:image/'.length, imageUrl.indexOf(';base64')),
      )
    } else {
      const splits = imageUrl.split('.')

      if (splits.length > 1) {
        setExt(imageUrl.split('.').pop())
      }
    }
  }, [imageUrl])

  useEffect(() => {
    const calculate = () => {
      const container = document.getElementById('image-container')
      const styles = window.getComputedStyle(container)
      const containerW =
        container.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight)
      const total = width * 2

      if (total <= containerW) {
        container.classList.remove('uk-flex-column')
      } else {
        container.classList.add('uk-flex-column')
      }
    }
    calculate()
    window.addEventListener('resize', calculate)
  }, [width])

  useEffect(() => {
    const string = `${borderRadius.tl}px ${borderRadius.tr}px ${borderRadius.bl}px ${borderRadius.br}px`
    if (string !== '0px 0px 0px 0px') {
      setStyle({ ...style, borderRadius: string })
    } else {
      deleteStyle('borderRadius')
    }
  }, [borderRadius])

  useEffect(() => {
    const val = `${offsetX}px ${offsetY}px ${dropShadowBlur}px`
    const string = `${val} ${dropShadow}`
    if (val !== initialFilters[dropShadowKey]) {
      updateFilter(dropShadowKey, string)
    } else if (filters[dropShadowKey]) {
      const filterBaru = {
        ...filters,
      }
      delete filterBaru[dropShadowKey]
      setFilters(filterBaru)
    }
  }, [dropShadow, offsetX, offsetY, dropShadowBlur])

  return {
    width,
    height,
    imageUrl,
    style,
    filters,
    code,
    copied,
    background,
    borderSize,
    borderStyle,
    borderColor,
    borderRadius,
    dropShadow,
    overlay,
    overlayBlend,
    overlayColor,
    overlayOpacity,
    resultUrl,
    updateFilter,
    updateBlend,
    process,
    setImageUrl,
    setWidth,
    setHeight,
    setBackground,
    setBorderSize,
    setBorderStyle,
    setBorderColor,
    setBorderRadius,
    setOverlay,
    setOverlayOpacity,
    setOverlayColor,
    setDropShadow,
    setCopied,
    sameRadius,
    setSameRadius,
    offsetX,
    setOffsetX,
    offsetY,
    setOffsetY,
    dropShadowBlur,
    setDropShadowBlur,
    ext,
    sameBorder,
    setSameBorder,
    reset,
  }
}

export default useImageGenerator
