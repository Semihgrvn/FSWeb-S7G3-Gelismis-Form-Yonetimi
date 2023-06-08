const Kullanici = (props) => {

    const { kullanici, valid } = props;

    return (
        <div style={{ "visibility": valid ? "visible" : "hidden" }}>
            {JSON.stringify(kullanici)}
        </div>
    )

}

export default Kullanici;