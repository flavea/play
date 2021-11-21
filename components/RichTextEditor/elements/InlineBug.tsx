const InlineChromiumBugfix = () => (
  <span contentEditable={false} style={{ fontSize: 0 }}>
    ${String.fromCodePoint(160)}
  </span>
)

export default InlineChromiumBugfix
