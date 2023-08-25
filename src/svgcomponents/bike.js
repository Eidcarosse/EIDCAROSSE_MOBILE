import * as React from "react"
import Svg, { Circle, Path, G } from "react-native-svg"

function Bike(props) {
  return (
    <Svg
      height={512}
      viewBox="0 0 512 512"
      width={512}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={95.041} cy={296.959} fill="#e6dbd4" r={15.041} />
      <Path
        d="M154.439 250.647h60.123L216 304zM424.959 225.918c-39.235 0-71.041 31.806-71.041 71.04S385.724 368 424.958 368 496 336.194 496 296.959s-31.806-71.041-71.041-71.041zm0 112c-22.621 0-40.959-18.338-40.959-40.96S402.338 256 424.959 256s40.959 18.338 40.959 40.959-18.338 40.959-40.96 40.959z"
        fill="#0177c3"
      />
      <Path
        d="M360 336H216l-1.438-85.353L232 240l31.16-54.15 42.569 3.38z"
        fill="#e6dbd4"
      />
      <Path
        d="M95.041 225.918c-39.235 0-71.041 31.806-71.041 71.04S55.806 368 95.041 368s71.041-31.806 71.041-71.041-31.806-71.041-71.04-71.041zm0 112c-22.62 0-40.959-18.338-40.959-40.96S72.42 256 95.042 256 136 274.338 136 296.959s-18.338 40.959-40.959 40.959z"
        fill="#0177c3"
      />
      <Path
        d="M223.94 183.97l-7.8 17.21-29.6 6.99-33.4-23.37-.75-36.63c.8 2.86 2.84 5.27 5.63 6.51z"
        fill="#e94a41"
      />
      <G fill="#e6dbd4">
        <Path d="M216 304L96 200l-24 32 115.582 93.91A45.065 45.065 0 00216 336z" />
        <Circle cx={259.58} cy={278.022} r={24} />
        <Path d="M446.43 159.925l1.548 1.087A233.213 233.213 0 00392 96l-31.965 23.974 5.02 1.71a383.317 383.317 0 0181.375 38.242z" />
      </G>
      <Path
        d="M454.908 173.817a233.134 233.134 0 00-6.93-12.805l-1.548-1.086a383.317 383.317 0 00-81.376-38.241l-5.02-1.711L360 120l65.497 58.232-29.464.556L372.123 160l-44.409 39.546-49.493-6.367L312 280l48 56 64-104 32.257-16.129c8.694-4.347 12.219-14.92 7.871-23.614l-9.22-18.44z"
        fill="#e94a41"
      />
      <Path
        d="M312 280l-13.486 32.09-49.276 23.725L360 336zM48 128l104 56 80 56 21.128-31.692a31.713 31.713 0 0130.32-13.877l44.552 5.57 46.185-40.845-91.907-20.784a43.882 43.882 0 00-50.61 26.46L224 184l-65.98-29.325a10.135 10.135 0 01-6.02-9.262c0-9.913-7.454-18.241-17.307-19.336l-21.91-2.434A183.539 183.539 0 0048 128z"
        fill="#e94a41"
      />
      <Circle cx={381.152} cy={156.382} fill="#0177c3" r={17.216} />
      <Path
        d="M223.94 183.97l-7.8 17.21-29.6 6.99-.07.02-33.33-23.25v-.14l-.75-36.63c.8 2.86 2.84 5.27 5.63 6.51l65.92 29.29z"
        fill="#0177c3"
      />
      <Path d="M110.082 212.205l-8.541 43.797L72 232l24-32z" fill="#e94a41" />
      <G fill="#002940">
        <Path d="M456.72 224.584l3.115-1.557c12.627-6.314 17.762-21.722 11.449-34.347l-9.22-18.44c-15.501-31.003-38-58.834-65.066-80.487a7.998 7.998 0 00-9.798-.153l-32 24a7.999 7.999 0 00-.515 12.379l14.792 13.152a20.95 20.95 0 00-7.615 9.397l-77.786-17.952a52.155 52.155 0 00-24.25.221c-16.115 4.029-29.418 15.642-35.587 31.064l-4.581 11.455-58.39-25.951a2.138 2.138 0 01-1.268-1.952c0-14.01-10.5-25.74-24.423-27.287l-21.91-2.435a190.92 190.92 0 00-67.607 4.548 8 8 0 00-1.853 14.805l103.588 55.778 69.601 48.72-5.084 3.105h-54.89l-56.183-48.692A8 8 0 0089.6 195.2l-21.173 28.23a7.965 7.965 0 00-3.872.583C35.059 236.355 16 264.987 16 296.96 16 340.542 51.458 376 95.041 376c34.213 0 64.376-22.24 74.987-54.044l12.51 10.164A53.225 53.225 0 00216 344s144.419-.008 144.627-.024c.028-.003.055-.01.083-.012a7.9 7.9 0 00.635-.086C376.235 364.086 399.632 376 424.96 376 468.542 376 504 340.543 504 296.96c0-31.847-19.273-60.008-47.28-72.375zm-4.04-15.868l-21.3 10.65c-.074.035-.146.072-.22.11l-10.738 5.369a8.002 8.002 0 00-3.235 2.962l-58.251 94.658-39.99-46.655-28.699-72.467 36.76 4.595a8.006 8.006 0 006.115-1.792l37.89-31.576a20.695 20.695 0 0010.102 2.648c.079.067.152.14.234.204l9.743 7.656a7.936 7.936 0 005.094 1.708l29.464-.556a8 8 0 005.164-13.977l-32.67-29.047a375.52 375.52 0 0143.797 23.35 221.22 221.22 0 015.814 10.838l9.22 18.441c2.367 4.735.44 10.513-4.294 12.881zm-38.13 56.959A32.934 32.934 0 01424.959 264c18.174 0 32.959 14.785 32.959 32.959s-14.785 32.959-32.959 32.959c-17.192 0-31.63-13.413-32.872-30.534-.005-.074-.02-.145-.026-.218l10.969-17.825 2.489 3.273a22.897 22.897 0 00-3.602 12.345c0 12.705 10.337 23.04 23.042 23.04s23.04-10.335 23.04-23.04-10.335-23.042-23.04-23.042c-2.335 0-4.588.352-6.713 1l-6.226-8.185.41-.665a7.986 7.986 0 002.12-.392zm10.409 24.242c3.882 0 7.041 3.16 7.041 7.042S428.841 304 424.959 304s-7.042-3.159-7.042-7.041 3.16-7.042 7.042-7.042zM224 328l-1.316-72.939 13.485-8.233c.048-.03.087-.059.131-.088a7.994 7.994 0 002.356-2.303l21.128-31.692c3.19-4.784 7.87-8.125 13.16-9.641l30.416 76.806-11.048 26.286L247.029 328H224zm77.984-8.702a7.999 7.999 0 003.905-4.108l8.467-20.148L342.606 328H283.91zm79.168-158.078c-2.668 0-4.838-2.17-4.838-4.838s2.17-4.839 4.838-4.839 4.839 2.17 4.839 4.839-2.171 4.838-4.84 4.838zm10.619-55.048c10.83 9.174 20.8 19.432 29.746 30.516a391.939 391.939 0 00-44.632-19.352l14.886-11.164zm13.124 64.448l-6.16.116-1.472-1.156a20.899 20.899 0 002.38-3.63l5.252 4.67zm-165.8-2.816c4.266-10.667 13.468-18.698 24.613-21.485a36.057 36.057 0 0116.77-.152l78.02 18.005-32.952 27.459-41.105-5.138c-15.018-1.876-29.57 4.78-37.97 17.377l-16.588 24.883-23.99-16.793 12.17-3.017a8 8 0 005.36-4.46l15.672-36.679zm-64.307 22.382l9.347-15.149 6.468 2.875-10.835 15.76-4.98-3.486zm38.536-2.176l-2.873 6.336-14.14 3.506 9.165-13.33zm-43.943-19.53l-7.723 12.515-.447-.312-.596-16.1 8.766 3.897zM111.9 131.594l21.91 2.434c5.81.646 10.19 5.54 10.19 11.385 0 .962.844 25.647.844 25.647l-73.03-39.323a175.121 175.121 0 0140.086-.143zm94.875 127.053l.739 27.412-31.63-27.412zm-80.509 27.752A32.87 32.87 0 01128 296.96c0 18.173-14.785 32.959-32.958 32.959s-32.96-14.786-32.96-32.959S76.869 264 95.043 264c1.332 0 2.661.103 3.977.26l6.885 5.595-3.962 5.12a22.956 22.956 0 00-6.9-1.058C82.335 273.918 72 284.255 72 296.96S82.336 320 95.041 320s23.042-10.336 23.042-23.041c0-4.47-1.284-8.645-3.497-12.182l3.74-4.83 7.94 6.452zm-24.183 10.56c0 3.882-3.16 7.041-7.042 7.041S88 300.841 88 296.959s3.159-7.042 7.041-7.042 7.042 3.16 7.042 7.042zm-4.834-85.29l4.095 3.55-5.104 26.169-13.223-10.744 14.231-18.975zM95.042 360C60.28 360 32 331.72 32 296.959c0-24.773 14.347-47.03 36.733-57.306l12.67 10.295c-20.379 5.922-35.32 24.748-35.32 47.011 0 26.996 21.963 48.959 48.959 48.959 25.742 0 46.892-19.975 48.802-45.237l12.662 10.288C150.042 339.457 124.414 360 95.042 360zm15.27-107.18l4.977-25.517L208 307.653v19.468a37.158 37.158 0 01-15.373-7.42l-82.315-66.88zM424.959 360c-21.39 0-41.055-10.66-52.768-28.546l8.455-13.739c7.876 16.69 24.91 28.203 44.313 28.203 26.996 0 48.959-21.963 48.959-48.959S451.955 248 424.959 248c-.477 0-.953.015-1.43.028l6.089-9.893 6.462-3.23c29.763 5.3 51.92 31.555 51.92 62.054 0 34.76-28.28 63.04-63.041 63.04z" />
        <Path d="M259.58 246.023c-17.645 0-32 14.355-32 32s14.355 32 32 32 32-14.355 32-32-14.355-32-32-32zm0 48c-8.823 0-16-7.178-16-16s7.177-16 16-16 16 7.177 16 16-7.178 16-16 16zM389.125 220.737a8 8 0 00-11.019 2.566l-17.034 27.376a8 8 0 0013.585 8.453l17.034-27.376a8 8 0 00-2.566-11.019zM361.75 204.312a7.999 7.999 0 00-11.02 2.566l-17.033 27.375a8 8 0 0013.585 8.454l17.033-27.376a8 8 0 00-2.565-11.019z" />
      </G>
    </Svg>
  )
}

export default Bike
