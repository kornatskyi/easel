import dynamic from "next/dynamic"

/** Using this middleware component to fixe the
 * Error: require() of ES Module /home/bohdan/Projects/easel/node_modules/konva/lib/Core.js from /home/bohdan/Projects/easel/
 * node_modules/react-konva/lib/ReactKonvaCore.js not supported. Instead change the require of Core.js in /home/bohdan/Projects/
 * easel/node_modules/react-konva/lib/ReactKonvaCore.js to a dynamic import() which is available in all CommonJS modules.
 */
const NoSSRKonvaBoard = dynamic(() => import("./KonvaBoardSSR"), {
  ssr: false,
})

const KonvaBoard = (props) => {
  return <NoSSRKonvaBoard {...props} />
}
export default KonvaBoard
