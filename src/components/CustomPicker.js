import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'

import { ColorWrap, Saturation, Hue, Alpha, Checkboard } from 'react-color/lib/components/common'

export const Sketch = ({ width, rgb, hex, hsv, hsl, onChange, onSwatchHover,
  disableAlpha, presetColors, renderers, className = '' }) => {
  const styles = reactCSS({
    'default': {
      picker: {
        width: '90%',
        border: 'solid 1px gray',
        margin: 'auto'
      },
      saturation: {
        paddingTop: '51%',
        position: 'relative',
        overflow: 'hidden',
      },
      Saturation: {
        radius: '3px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
      },
      controls: {
        display: 'flex',
      },
      sliders: {
        padding: '4px 0',
        flex: '1',
      },
      color: {
        width: '24px',
        height: '24px',
        position: 'relative',
        marginTop: '4px',
        marginLeft: '4px',
        borderRadius: '3px',
      },
      hue: {
        position: 'relative',
        height: '25px',
        overflow: 'hidden',
      },
      Hue: {
        radius: '2px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
      },

      alpha: {
        position: 'relative',
        height: '25px',
        marginTop: '10px',
        overflow: 'hidden',
      },
      Alpha: {
        radius: '2px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
      },
    },
    'disableAlpha': {
      color: {
        height: '10px',
      },
      hue: {
        height: '10px',
      },
      alpha: {
        display: 'none',
      },
    },
  }, { disableAlpha })

  return (
    <div style={ styles.picker } className={ `sketch-picker ${ className }` }>
      <div style={ styles.saturation }>
        <Saturation
          style={ styles.Saturation }
          hsl={ hsl }
          hsv={ hsv }
          onChange={ onChange }
        />
      </div>
      <div style={ styles.controls } className="flexbox-fix">
        <div style={ styles.sliders }>
          <div style={ styles.hue }>
            <Hue
              style={ styles.Hue }
              hsl={ hsl }
              onChange={ onChange }
            />
          </div>
          <div style={ styles.alpha }>
            <Alpha
              style={ styles.Alpha }
              rgb={ rgb }
              hsl={ hsl }
              renderers={ renderers }
              onChange={ onChange }
            />
          </div>
        </div>
      </div>

    </div>
  )
}

Sketch.propTypes = {
  disableAlpha: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Sketch.defaultProps = {
  disableAlpha: false,
  width: 200,
  presetColors: ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
    '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000',
    '#4A4A4A', '#9B9B9B', '#FFFFFF'],
}

export default ColorWrap(Sketch)
