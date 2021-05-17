import { chinese2Arabic } from "../src"

describe("chinese2Arabic", function () {
  it.each`
    input | expected
    ${"〇"} | ${"0"}
    ${"一"} | ${"1"}
    ${"二"} | ${"2"}
    ${"三"} | ${"3"}
    ${"四"} | ${"4"}
    ${"五"} | ${"5"}
    ${"六"} | ${"6"}
    ${"七"} | ${"7"}
    ${"八"} | ${"8"}
    ${"九"} | ${"9"}
  `("one digit [$input -> $expected]", ({input, expected}) => {
    expect(chinese2Arabic(input)).toBe(expected)
  })

  it("no large numbers", () => {
    expect(chinese2Arabic("一二三四五六七八九〇")).toBe("1234567890")
  })

  it.each`
    input | expected
    ${"五千四百三十二"} | ${"5432"}
    ${"千百十一"} | ${"1111"}
    ${"五千"} | ${"5000"}
    ${"五千三十"} | ${"5030"}
    ${"五百一"} | ${"501"}
  `("with large numbers [$input -> $expected]", ({input, expected}) => {
    expect(chinese2Arabic(input)).toBe(expected)
  })

  it.each`
    input | expectedMessage
    ${"四五千"} | ${"unable to parse 四五千"}
    ${"五千四三百"} | ${"unable to parse 四三百"}
    ${"五千四百三二十"} | ${"unable to parse 三二十"}
    ${"五千四百三十二一"} | ${"unable to parse 二一"}
  `("unparsable [$input]", ({input, expectedMessage}) => {
    try {
      chinese2Arabic(input)
      fail("should not reach here")
    } catch (e) {
      expect(e.message).toBe(expectedMessage)
    }
  })
})