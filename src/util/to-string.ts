import { TimeOfUsePeriod, TimeOfUse } from "../types/time-of-use";

export class ToString {
  public static timeOfUsePeriod(toup: TimeOfUsePeriod): string {
    let fromHour = '';
    let fromAmPm = '';
    if (toup.fromHour === 0) {
      fromHour = '12';
      fromAmPm = 'am';
    } else if (toup.fromHour && toup.fromHour < 13) {
      fromHour = `${toup.fromHour}`;
      fromAmPm = 'am';
    } else if (toup.fromHour && toup.fromHour > 12) {
      fromHour = toup.fromHour ? `${toup.fromHour-12}` : '';
      fromAmPm = 'pm';
    }
    let fromMinute = '';
    if (toup.fromMinute && toup.fromMinute !== 0) {
      fromMinute = `:${toup.fromMinute}`
    }

    let toHour = '';
    let toAmPm = '';
    if (toup.toHour === 0) {
      toHour = '12';
      toAmPm = 'am';
    } else if (toup.toHour && toup.toHour < 13) {
      toHour = `${toup.toHour}`;
      toAmPm = 'am';
    } else if (toup.toHour && toup.toHour > 12) {
      toHour = toup.toHour ? `${toup.toHour-12}` : '';
      toAmPm = 'pm';
    }

    let toMinute = '';
    if (toup.toMinute !== 0 && toup.toMinute) {
      toMinute = `:${toup.toMinute}`
    }

    const weekDay = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    if (toup.fromDayOfWeek === 0 && toup.toDayOfWeek === 6) {
      return `${fromHour}${fromMinute}${fromAmPm}-${toHour}${toMinute}${toAmPm}`;
    } else {
      const fromDayOfWeek = (toup.fromDayOfWeek !== undefined) ? `${weekDay[toup.fromDayOfWeek]}` : '';
      const toDayOfWeek = (toup.toDayOfWeek !== undefined) ? weekDay[toup.toDayOfWeek] : '';
      return `${fromHour}${fromMinute}${fromAmPm}-${toHour}${toMinute}${toAmPm} ${fromDayOfWeek}-${toDayOfWeek}`;
    }
  }

  public static timeOfUse(tou: TimeOfUse): string {
    const touName = tou.touName ? tou.touName : '';
    const toup = tou.touPeriods ? tou.touPeriods.map((toup: TimeOfUsePeriod) => ToString.timeOfUsePeriod(toup)): [];
    if (!tou.season && !tou.touPeriods) {
      return touName;
    } else if (!tou.season) {
      return `${touName} ${toup.join(', ')}`
    } else if (!tou.touPeriods) {
      return `${touName} ${tou.season.seasonName}`
    }
    return `${touName} ${tou.season.seasonName} ${toup.join(', ')}`;
  }
}