export { Gamespace };

function Gamespace() {
    let name = null;
    let coordinates = null;

    const getName = () => name;

    const getCoordinates = () => coordinates;

    const setName = (val) => name = val;

    const setCoordinates = (val) => coordinates = val;

    return {
        getName,
        getCoordinates,
        setName,
        setCoordinates,
    }
}