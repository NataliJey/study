$(function () {

    let $ingredientsList = $('.ingredients-list');
    let url = 'https://api.allorigins.win/raw?url=https://vk.com/doc387129635_634241879?hash=Z5XzIluqyxgzHjPy47WsBekXFS8N0bvGgNWPv6z62b8&dl=0ZzD86B7Io1tenl3Wt5HkcCD0ZmnOWXHQzZP6Gx01ST';

$.getJSON(url, function( json ) {
     console.log( "JSON Data: " + json[99].title );
});


    // let h = {
    //     "id": "minecraft:polished_granite",
    //     "title": "Polished Granite",
    //     "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFYElEQVR4XmMYaMBIrgPCrfT/W2kogrULS8kyxLRMJssskjW5GWj89zbSAFv85fsvMM3DyQam1TTUGDzLukgyk2jFyD4GWQyylJObG2zx969f4Q4CiZMSIgQdAPKxvaYSA8zgC5cuM8iKCKBYiB6NMAcSEyI4HYDsY3zpBBYN779+AyuDOQ7EefzmA1jM2cYMZ9RgOACbxehBjc9BILWwKEFXJ6xtwhBTXINiJ5wDCmpBLnYGUMqGWfj6zXuwGbBEBorbh3fvgsVERQTB9K2HTxkM9HQZQOIgdbDgR7YcZPHDM8fA0QiKFpAcLLHCHdCVEfEfJPHq2QuGx0CLQQ6BBS9IHOYIYnyPnEhBoQHiGxnqgLVOWLOT4c/Pnwx7L94A282CbODjh08YZOVlGNhllBkeP4H4FDnBgdSCfI6c6pH1I2dLEBvdYpDaH1++MPz++xeuDe6Aj0yQLHXr9gMGTjYWsEM+fv3F8OX7D3g0gAyE+Qg5VNDTCIgPC2qQjzmA5sEsZmVmZnjz6SumA/j/fWX4BBQGWQ6SBYXG919/GNRUFRhADrl04y4w+wkywKICFt/oUQKy+O2n7wwzNu1l+AHUD7L4B1QRyHKIw9kxHYBs0KtPXxhkxUUZ2DkZGEAOYefkZFBRVmbg52ZjeAxMIzDfwxwBChl5oDxIHNliFlZWsLGff/xkEOTlYfj+4we6exkQUfD1F1xSjI+H4ef37wygEACFCIgNwp/eMDDwiYgx/Pz6mQEW3zCLVx84Btb/4d0HcByDfPvn92+wGMhyEBskhhz/IEm4A0C+u3PvCwPIcphLQJaDHAHig9igkIHx2aWkwA45BbX49eu3YG2cHBwMIJ9j8y3IcvQ0wIQcJrxAzaDgBlkCs0iAnxeuBBQtIIeIAy3/9OYVw4ePn+G+5hWTZID5GmQ5yCEwjSCLOYTFGGAhwMOJJQ2AEhosuEGWgoIcZACMhjgIEi3fnz0D55S7L98wsAmKgu358fYV3KGwxAajQRIgeViaQPY0SgiALAEFM7KloDgHOQyWO5DZYvw8DBz/fzFgA7D4h8nBooWDh4fhx+8/cC0IB/AKgn0FSgOwuAZZdufePbhi5KiBRRG65aDgBgc50CLkBAdLhKBsiTcEQJLICRHERk6IyCEBMwiUzUCWgXwJCnYQfv3mLQMsQcIcgp4DQPrhIQAqiGCGgySQcwAoTYASJ0gcRsMcBSpsOFhZGJCzHUgdLwc7A8jXoATJy88P9zTIEV++/8QSBVAhPkV1BmQfg4RBaQKe4qEpH5wtP35hABWzsMQGCwlknyInRFjoYI0CUC4AWfzzxSMGZN/DFMPEYDQocYISIUgeZiHI1yA+sqUgPizeYdGEnA1RcgHIcFgOQI4OUKIEGQTK/7DSEVQOgMoNUBSg+xLmaFCIgNIFLPvBoglrFIBS+5XHL8B6YakdZjEsUYIsBSmARdFnaNmOHOTIbOR0AHPU/dfvGH78QWRDeFG88ugFWOPk/5cfvxgsVOWAUcEDLvtBFsMSHwPDdwaQwzjZeCBmsnMB6Y9gNqi0Y4AWSOD8Dq37QT5//v4TWM2j1+9RmmQoDRKQiv1X7sAdwsPBxgBqx0B8/B2eOEFBDxJ7BUyEfALMDD+AdTwomP98eg+uiGAFDSg0nrz7yMDBwsJw6/lrrA1gDAfAgur0nUdwh4DElMVFGGDpAhQasLQCUw/KbrBUjs/HDGgApwNg6mAhAoyW/+AQkZVgYJeQY2AA5hZQLvgAbHSAfApLiKA4xudjkh2ANUSAiVUH6BBQFLBxcTOQ4mN0B2CNFwYigKmKHLgV/fffPwZQtsIVxwyDHQAAohjCJhvZA9cAAAAASUVORK5CYII="
    // }
    function addIngredient(item) {
        let $indredient = $(`
            <div class="item">
                <img src="${item.image}" alt="${item.title}">
            </div>
        `)
        $ingredientsList.append($indredient);
    }
});