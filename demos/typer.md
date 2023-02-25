# Typer

This component demonstrates complex prop handlers and Javascript expressions in CSS.

<script src="/components/typer.js" type="module"></script>

<element-story>
<script type="application/json">
  {
    "base": {
      "type": "text"
    },
    "words": {
      "type": "text"
    },
    "speed": {
      "type": "number"
    },
    "pause": {
      "type": "number"
    },
    "cursor": {
      "type": "boolean"
    }
  }
</script>
<ardi-typer base="Ardi was built to:" pause="5000" speed="100" words="provide great DX without tooling, work with every framework, break free from frameworks, create portable components that work anywhere" cursor="true"></ardi-typer>
</element-story>

## Javascript

[](../components/typer.js ':include')
