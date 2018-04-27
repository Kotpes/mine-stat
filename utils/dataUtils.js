//@flow
/**
 * Converts raw rate to MH/s
 * @param {number} rawRate 
 */

export const getHashrate = (rawRate: number): string => {
  
  let rate
  let units 
  if (!rawRate) {
    rate = 0
    units = 'MH/s'
  } else if (rawRate <= 1000000000) {
    rate = rawRate / 1000000
    units = 'MH/s'
  } else {
    rate = rawRate / 1000000000
    units = 'GH/s'
  }
  const roudRate = Number.parseFloat(rate.toString()).toPrecision(3)
  
  return `${roudRate} ${units}`
}

/**
 * Normalizes base units of ballance
 * @param {number} baseUnits 
 */
export const getBallance = (baseUnits: number, curCode: ?string = ""): string => {
  let ballance
  if (curCode && curCode === "ZEC") {
    ballance = baseUnits ? (baseUnits)/100000000 : 0
  } else {
    ballance = baseUnits ? (baseUnits/10)/100000000000000000 : 0
  }
  const convert =  Number.parseFloat(ballance.toString()).toPrecision(4)
  
  return convert
}

/**
 * Generates random string
 */
export const generateId = ():string => {
  var id = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    id += possible.charAt(Math.floor(Math.random() * possible.length));

  return id;
}