const Meme = ({template, onClick, stylePass}) => {
    return (
        <img
        style={stylePass}
        key={template.id}
        src={template.url}
        alt={template.name}
        onClick={onClick}
      />
    )
}

export default Meme
