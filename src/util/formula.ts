export class Formula {
  // All variables are prefixed with this
  private static readonly VARIABLE_PREFIX = '#';

  // All functions are prefixed with this, after the variable prefix e.g. the formulaString would be '#fnMin'
  private static readonly FUNCTION_PREFIX = 'fn';

  private static readonly EMPTY = '';

  private static readonly REGEX_NULL_SAFE = '\\?';


  public static getProperties(
    formula: string
  ): Set<string> {
    //
    // if there are no legitimate properties do not evaluate
    //
    if (!formula || !formula.includes(this.VARIABLE_PREFIX)) {
      return new Set();
    }

    const properties: Set<string> = new Set<string>();
    const initialSplit = formula.substr(formula.indexOf(this.VARIABLE_PREFIX)).split(this.VARIABLE_PREFIX);

    for (const str of initialSplit) {
      if (!str || str.startsWith(this.FUNCTION_PREFIX)) {
        continue;
      }

      // We use a space to separate properties from operators, numbers
      // and other pieces of the formula. e.g. (#demand / 2) + 100 => #demand
      const secondSplit = str.split(' ');

      // Some commas can be in the formula if not spaced correctly.
      let cleanProperty = secondSplit[0].replace(',', this.EMPTY);

      // The ? denotes handling of nulls, so for purposes
      // of determining the formulas, we ignore the ? characters.
      cleanProperty = cleanProperty.replace(this.REGEX_NULL_SAFE, this.EMPTY);

      properties.add(cleanProperty);
    }

    // Note: At this point in the corresponding Java code we register all of the function variables into
    // the StandardEvaluationContext, but that is pretty meaningless in this function

    return properties;
  }
}