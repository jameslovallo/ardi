# Decoration

## Demo

<script src="/components/decoration.js" type="module"></script>

<style>
  ardi-decoration {
    flex-grow: 1;
  }
  .demo-card {
		border: 1px solid rgba(125, 125, 125, 0.5);
		border-radius: 8px;
    height: 5rem;
  }
</style>

<div style="display: flex; gap: 2rem;">

  <ardi-decoration label="Ribbon" type="ribbon">
    <div class="demo-card"></div>
  </ardi-decoration>

  <ardi-decoration background="#e53935" label="3" type="badge">
    <div class="demo-card"></div>
  </ardi-decoration>

</div>

## HTML

```html
<ardi-decoration label="Ribbon" type="ribbon">
  <div class="demo-card"></div>
</ardi-decoration>

<ardi-decoration background="#e53935" label="3" type="badge">
  <div class="demo-card"></div>
</ardi-decoration>
```

## Javascript

[](../components/decoration.js ':include')
