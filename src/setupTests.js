window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () { },
            removeListener: function () { },
        };
    };

jest.mock('react-chartjs-2', () => ({
    Line: () => null
}))