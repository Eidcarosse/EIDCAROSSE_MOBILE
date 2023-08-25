import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function Van(props) {
  return (
    <Svg
      height={512}
      viewBox="0 0 512 512"
      width={512}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M24 136v224a8 8 0 008 8h448a8 8 0 008-8v-79.368a24 24 0 00-15.573-22.472L424 240l-47.611-108.826A32 32 0 00347.072 112H48a24 24 0 00-24 24z"
        fill="#ffb431"
      />
      <Path
        d="M32 328h448a8 8 0 018 8v32H24v-32a8 8 0 018-8z"
        fill="#415e89"
        transform="rotate(180 256 348)"
      />
      <Path
        d="M312 152v80a8 8 0 008 8h104l-42-96h-62a8 8 0 00-8 8z"
        fill="#4db6e4"
      />
      <Path
        d="M448 296h32a8 8 0 018 8v16a8 8 0 01-8 8h-32v-32z"
        fill="#dfdfdd"
        transform="rotate(180 468 312)"
      />
      <Path d="M48 136h240v16H48zM48 232h240v16H48z" fill="#f9a40f" />
      <Path d="M352 144h16v96h-16z" fill="#3ba5d3" />
      <Circle cx={376} cy={352} fill="#34507b" r={48} />
      <Circle cx={120} cy={352} fill="#34507b" r={48} />
      <Circle cx={376} cy={352} fill="#dfdfdd" r={16} />
      <Circle cx={120} cy={352} fill="#dfdfdd" r={16} />
      <Path d="M312 264h32v16h-32zM256 264h32v16h-32z" fill="#ffc261" />
      <Path
        d="M32 296h24v32H32a8 8 0 01-8-8v-16a8 8 0 018-8z"
        fill="#d65246"
        transform="rotate(180 40 312)"
      />
    </Svg>
  )
}

export default Van
