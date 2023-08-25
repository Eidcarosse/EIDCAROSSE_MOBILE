import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Car(props) {
  return (
    <Svg
      width={52}
      height={52}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M46.014 16.817l-.748-1.495.748-.747h2.989l.747 1.493-.747.749h-2.99zM8.648 16.817l.748-1.495-.748-.747H5.66l-.747 1.493.747.749h2.99z"
        fill="#F5B953"
      />
      <Path
        d="M37.046 33.792l2.242.961 7.473-.747v-2.242l-2.242-2.99v.116l-8.968 1.378-16.44.001-8.968-1.38v-.115L7.9 31.764v2.242l7.473.747 2.242-.96.747-.535.747 1.494h16.441l.747-1.494.748.534z"
        fill="#243242"
      />
      <Path
        d="M47.508 33.424l.829-.57c.416-.285.666-.766.666-1.28v-6.537l-3.736 3.736-.188.747 1.682 2.243v2.242l.747-.581zM7.154 33.424l-.83-.57a1.551 1.551 0 01-.665-1.28v-6.537l3.736 3.736.188.747-1.682 2.243v2.242l-.747-.581z"
        fill="#F2C351"
      />
      <Path
        d="M44.519 18.312l-1.36-2.723a8.964 8.964 0 00-7.425-4.938l-8.403-.56-8.402.56a8.973 8.973 0 00-7.425 4.938l-1.361 2.723"
        fill="#C7E2FC"
      />
      <Path
        d="M48.255 33.258v1.449c0 .85-.668 1.54-1.494 1.54h-2.99a1.479 1.479 0 01-1.494-1.495M6.406 33.258v1.449c0 .85.67 1.54 1.495 1.54h2.99c.825 0 1.494-.644 1.494-1.495"
        fill="#4D5D7A"
      />
      <Path
        d="M46.76 36.247h-2.988c-.826 0-1.495-.69-1.495-1.54"
        fill="#4D5D7A"
      />
      <Path d="M10.143 18.312h34.376v8.967H10.143v-8.967z" fill="#F5B953" />
      <Path
        d="M10.455 18.312l5.666 5.978 5.231 1.495h2.99l1.494-.748h2.99l1.494.748h2.99l5.23-1.495 5.978-5.98 2.99 1.496 1.495 2.242v2.99l-3.737 3.736-9.715 1.494H19.11l-9.716-1.494-3.736-3.737v-2.989l1.495-2.242 2.989-1.494h.312z"
        fill="#F5B953"
      />
      <Path
        d="M13.88 25.037l-2.451 1.742-2.99-1.834.21-3.327 5.23 3.42zM40.782 25.037l2.45 1.742 2.99-1.834-.209-3.327-5.23 3.42z"
        fill="#C7E2FC"
      />
      <Path
        d="M7.478 34.553L5.902 33.47a2.294 2.294 0 01-.99-1.897v-6.875h1.494v6.875c0 .27.128.519.342.666l1.576 1.083-.846 1.23zM10.143 17.564h34.375v1.495H10.143v-1.495zM11.429 27.527a.747.747 0 01-.39-.11l-2.99-1.834a.748.748 0 01-.355-.684l.208-3.328a.747.747 0 011.155-.579l5.231 3.42a.748.748 0 01.024 1.234l-2.45 1.742a.747.747 0 01-.433.139zm-2.215-2.984l2.184 1.34 1.156-.82-3.24-2.117-.1 1.597zM43.233 27.527a.747.747 0 01-.433-.139l-2.45-1.742a.747.747 0 01.024-1.233l5.23-3.42a.749.749 0 011.155.58l.209 3.327a.747.747 0 01-.356.684l-2.99 1.834a.751.751 0 01-.39.109zm-1.125-2.463l1.155.82 2.185-1.34-.1-1.598-3.24 2.117zM8.727 18.646l-.54-1.082H5.658a.746.746 0 01-.53-.219l-.746-.748a.748.748 0 01-.14-.862l.747-1.494a.748.748 0 01.669-.413h2.99c.198 0 .388.078.528.219l.747.747a.747.747 0 01.14.862l-.58 1.161.58 1.16-1.337.669zM5.969 16.07h2.217l.3-.6-.147-.148H6.12l-.3.6.148.148zM45.935 18.646l-1.337-.67.58-1.159-.58-1.16a.747.747 0 01.14-.863l.748-.747a.74.74 0 01.528-.22h2.989c.283 0 .542.16.669.414l.747 1.494a.748.748 0 01-.14.862l-.747.748a.746.746 0 01-.53.22h-2.527l-.54 1.08zm.54-2.576h2.218l.148-.148-.3-.6h-2.218l-.147.148.3.6z"
        fill="#000"
      />
      <Path
        d="M15.374 35.5c-.025 0-.05-.001-.075-.004l-7.473-.747a.747.747 0 01-.672-.744v-2.242c0-.161.052-.319.149-.448l2.241-2.99 1.196.896-2.092 2.791v1.317l6.609.66 5.054-2.165.588 1.373-5.23 2.242a.739.739 0 01-.295.06zM39.288 35.5c-.101 0-.202-.02-.295-.06l-5.23-2.243.587-1.373 5.055 2.165 6.608-.66v-1.317l-2.092-2.79 1.196-.896 2.242 2.989c.097.129.15.287.15.448v2.242a.747.747 0 01-.673.744l-7.474.747a.631.631 0 01-.074.004z"
        fill="#000"
      />
      <Path
        d="M19.11 31.016a.73.73 0 01-.113-.01l-9.715-1.494a.749.749 0 01-.415-.21l-3.736-3.736a.745.745 0 01-.22-.529v-2.989c0-.147.045-.292.126-.415l1.495-2.241a.748.748 0 01.288-.255l2.989-1.494a.749.749 0 01.334-.079h.312a.75.75 0 01.543.233l5.526 5.831 4.933 1.41h2.708l1.337-.67a.75.75 0 01.334-.078h2.99a.75.75 0 01.334.079l1.337.668h2.708l4.943-1.412 5.841-5.843a.748.748 0 01.863-.14l2.99 1.495a.754.754 0 01.287.255l1.495 2.241a.746.746 0 01.126.415v2.99a.745.745 0 01-.219.528l-3.736 3.736a.746.746 0 01-.415.21l-9.716 1.495a.73.73 0 01-.114.009H19.11zm-9.359-2.943l9.416 1.448h16.327l9.417-1.448 3.344-3.345v-2.453l-1.259-1.889-2.33-1.166-5.597 5.598a.74.74 0 01-.324.19l-5.23 1.495a.723.723 0 01-.206.029H30.32a.75.75 0 01-.334-.079l-1.337-.668h-2.636l-1.337.668a.754.754 0 01-.334.079h-2.99a.722.722 0 01-.204-.03l-5.232-1.494a.747.747 0 01-.337-.204l-5.385-5.682-2.529 1.264-1.259 1.889v2.453l3.345 3.345z"
        fill="#000"
      />
      <Path
        d="M47.184 34.553l-.847-1.232 1.576-1.083a.8.8 0 00.342-.665v-6.875h1.495v6.875c0 .763-.37 1.472-.99 1.898l-1.576 1.082zM26.584 26.531h1.494v1.495h-1.494V26.53zM35.551 35.5h-16.44a.748.748 0 01-.67-.414l-.747-1.494 1.337-.669.541 1.082H35.09l.541-1.081 1.337.669-.747 1.494a.749.749 0 01-.669.413zM10.89 36.994H7.9c-1.235 0-2.241-1.026-2.241-2.287v-1.45h1.495v1.45c0 .437.334.793.747.793h2.99c.412 0 .746-.356.746-.793h1.495c0 1.261-1.006 2.287-2.242 2.287z"
        fill="#000"
      />
      <Path
        d="M10.89 36.994H7.9V35.5h2.99c.413 0 .747-.356.747-.793h1.495c0 1.261-1.006 2.287-2.242 2.287zM46.76 36.994h-2.988a2.218 2.218 0 01-2.242-2.242h1.494c0 .426.322.748.748.748h2.989c.412 0 .747-.356.747-.793v-1.45h1.495v1.45c0 1.261-1.006 2.287-2.242 2.287z"
        fill="#000"
      />
      <Path
        d="M46.76 36.994h-2.988c-1.236 0-2.242-1.026-2.242-2.287h1.494c0 .437.335.793.748.793h2.989v1.494zM43.85 18.646l-1.36-2.723a8.283 8.283 0 00-2.202-2.73l-.017-.014a8.178 8.178 0 00-4.588-1.783l-8.352-.556-8.352.557a8.183 8.183 0 00-4.606 1.796 8.282 8.282 0 00-2.2 2.731l-1.361 2.722-1.337-.668 1.36-2.723a9.785 9.785 0 012.62-3.24l.02-.015a9.665 9.665 0 015.405-2.094l8.4-.56a.736.736 0 01.1 0l8.401.56A9.67 9.67 0 0141.187 12l.018.014a9.785 9.785 0 012.62 3.241l1.361 2.723-1.336.668z"
        fill="#000"
      />
      <Path
        d="M24.657 15.462l5.232-3.734.869 1.216-5.233 3.735-.868-1.217z"
        fill="#000"
      />
    </Svg>
  )
}

export default Car
