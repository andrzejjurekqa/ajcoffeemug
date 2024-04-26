export class Generics {

    async genericLoop(locator, name) {
        for (let i = 0; i < await locator.count(); i++) {
            const itemList = await locator.nth(i).textContent();
            if (itemList!.includes(name!)) {
                return true
            } else {
                throw new Error('Item not found');
            }
        }
    }
}