---
name: design
description: Visual design for the Errands app and its Shopping list screen. Read before building or changing any screen.
---

## Direction: warm and minimal

Simple, warm and tidy, like a good paper notebook turned into an app.

- Colors: background `#F6F5F1`, surfaces `#FFFFFF`, text `#1C1B19`, secondary `#7A776F`, hairlines `#E7E4DC`. One accent for done items: `#2F855A`. Primary buttons are near-black `#1C1B19` with white text.
- Type: system font, a clear scale (title 32/bold, section 13/semibold uppercase with letter spacing, body 17, secondary 15).
- Shopping list screen:
  - Header: the count as a big line ("3 left to buy") with the total items in secondary text under it.
  - Add row: a rounded pill text field ("Add an item") and a round black Add button with a plus symbol, side by side. Keep the existing accessibility label and role names the tests use.
  - Items: white rows in one rounded group (radius 16) split by hairlines. A round custom checkbox on the left (empty circle; filled accent with a white check when bought), the name, and a quiet remove button on the right.
  - Bought items move to a second group titled "In the cart", with a strikethrough and lower opacity.
  - Empty state: a centered, friendly "Your list is empty" with one line of help text under it.
  - Press feedback on every button (slight opacity or scale), and items animate in and out (`LayoutAnimation` or Reanimated if already installed; do not add new native dependencies).
- Home screen: style the "Shopping list" link card to match (white, radius 16, hairline border, a chevron on the right).

States to screenshot: empty list, three items with one bought, on the web and on Android.

## Rules for every screen

- One clear visual direction, used everywhere. No default framework or browser look (no unstyled inputs, no default blue links, no stock Material purple).
- Sans-serif type only. Use a real type scale with a few sizes, not many. Large, confident headings; quiet secondary text.
- Mostly neutral colors plus one accent. Use color for meaning (selected, done, error), not decoration. No purple or pink.
- Even spacing on an 8 px grid. Generous margins. Line up edges.
- Every interactive element has hover (or pressed), focus and disabled states.
- Design the empty state, the error state and the full state, not just one.
- Small, quick motion (150 to 250 ms) when things appear, change or finish.
- Support light and dark appearance if the platform has it, and check both.

## Check before you open the pull request

1. Take screenshots of every screen and state in the list above.
2. Look at each one at full size. Fix anything that is misaligned, cramped, clipped, low contrast or looks unfinished.
3. Put the final screenshots in the pull request description.
