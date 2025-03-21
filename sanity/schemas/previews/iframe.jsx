export default function IframePreview({ url, title }) {
  return (
    <iframe
      src={url}
      title={title || 'Preview'}
      width="100%"
      height="450px"
      style={{
        border: 'none',
        borderRadius: '4px',
        overflow: 'hidden'
      }}
    />
  )
}
