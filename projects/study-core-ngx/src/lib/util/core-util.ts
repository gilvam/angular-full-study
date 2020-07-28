export class CoreUtil {
  /**
   * comparar valores entre objetos
   * @param x
   * @param y
   */
  public static isEquals<T>(x: T, y: T) {
    if (!x && !y) {
      return true;
    } else if (!x || !y) {
      return false;
    }
    // tslint:disable-next-line:triple-equals
    else if (x === y || x == y) {
      return true; // if both x and y are null or undefined and exactly the same
    } else if (!(x instanceof Object) || !(y instanceof Object)) {
      return false; // if they are not strictly equal, they both need to be Objects
    } else if (x.constructor !== y.constructor) {
      // they must have the exact same prototype chain, the closest we can do is
      // test their constructor.
      return false;
    } else {
      for (const p in x) {
        if (!x.hasOwnProperty(p)) {
          continue; // other properties were tested using x.constructor === y.constructor
        }
        if (!y.hasOwnProperty(p)) {
          return false; // allows to compare x[ p ] and y[ p ] when set to undefined
        }
        if (x[p] === y[p]) {
          continue; // if they have the same strict value or identity then they are equal
        }
        if (typeof (x[p]) !== 'object') {
          return false; // Numbers, Strings, Functions, Booleans must be strictly equal
        }
        if (!this.isEquals(x[p], y[p])) {
          return false;
        }
      }
      for (const p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
          return false;
        }
      }
      return true;
    }
  }

  private static getStyle(oElm, strCssRule) {
    let strValue = '';
    if (document.defaultView && document.defaultView.getComputedStyle) {
      strValue = document.defaultView.getComputedStyle(oElm, '').getPropertyValue(strCssRule);
    } else if (oElm.currentStyle) {
      strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
        return p1.toUpperCase();
      });
      strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
  }

  /**
   * Retorna soma dos paddings e margins para completar a altura de um elemento
   * @param nativeElement
   */
  public static getPaddingAndMarginTopBottom(nativeElement: Element) {
    let count = 0;
    count += parseInt(this.getStyle(nativeElement, 'padding-top'), 10);
    count += parseInt(this.getStyle(nativeElement, 'padding-bottom'), 10);
    count += parseInt(this.getStyle(nativeElement, 'margin-top'), 10);
    count += parseInt(this.getStyle(nativeElement, 'margin-bottom'), 10);
    return count;
  }
}
