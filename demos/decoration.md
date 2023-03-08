# Decoration

This component demonstrates conditional rendering, slots, and Javascript values in CSS.

<script src="/components/decoration.js" type="module"></script>

<style>
  .demo-box {
    border: 1px solid rgba(125, 125, 125, 0.5);
    border-radius: 8px;
    height: 5rem;
  }
</style>

## Playground

<element-story>
  <script type="application/json">
    {
      "type": {
        "type": "list",
        "options": ["badge", "ribbon"]
      },
      "label": {
        "type": "text"
      },
      "background": {
        "type": "color"
      },
      "color": {
        "type": "color"
      },
      "href": {
        "type": "text"
      },
      "target": {
        "type": "list",
        "options": ["_blank", "_self"]
      }
    }
  </script>
  <ardi-decoration background="#5E35B1" color="#ffffff" href="https://google.com" label="Ribbon" type="ribbon" style="max-width: 350px; width: 100%;">
    <div class="demo-box"></div>
  </ardi-decoration>
</element-story>

## Javascript

[](../components/decoration.js ':include')
