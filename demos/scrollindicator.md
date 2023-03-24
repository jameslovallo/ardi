# Scroll Indicator

This component demonstrates complex prop handlers and Javascript expressions in CSS.

<script src="/components/scrollindicator.js" type="module"></script>

<style>
  element-story::part(wrapper) {
    min-height: 300px;
    padding: 0;
  }
  element-story > div {
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    position: absolute;
    left: 0;
    width: 100%;
  }
  element-story > div p {
    margin: 1rem !important;
  }
</style>

## Playground

<element-story tag="ardi-scroll-indicator">
<script type="application/json">
  {
    "background": {
      "type": "color"
    },
    "foreground": {
      "type": "color"
    },
    "height": {
      "type": "text"
    },
		"position": {
			"type": "list",
			"options": ["fixed", "sticky"]
		}
  }
</script>
<div>
<ardi-scroll-indicator background="#555555" foreground="#ffab00" height="5" position="sticky"></ardi-scroll-indicator>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo enim perferendis saepe. Cupiditate fuga, vitae corrupti aliquam asperiores eveniet laboriosam consequuntur sequi fugit, nostrum ea quidem tempora impedit. Saepe, placeat.</p>
<p>Fugit exercitationem possimus itaque nisi consequatur libero ratione adipisci, ipsa error voluptates nam ullam! Corporis dicta quia ratione. Reiciendis sed esse est non aspernatur, consequuntur totam illo fugit ab cumque.</p>
<p>Maiores nemo perspiciatis recusandae veritatis, quos nostrum incidunt nulla, laborum aspernatur eveniet vitae assumenda fugiat rem, sunt commodi excepturi cum quidem ad illo quam modi? Rem assumenda at illum praesentium!</p>
<p>Quas ullam consequatur, illo quasi, rem, necessitatibus repellat quae itaque velit nihil ab. Ratione, vero! Illum inventore fugit, quaerat repellendus expedita minima reprehenderit corporis dignissimos, quas, velit asperiores adipisci ratione.</p>
<p>Iusto, minima eos. Cum deserunt voluptatum eaque, temporibus doloribus incidunt fugit dolores nihil, accusamus ab eum. Explicabo maxime incidunt nulla? Eos sunt numquam maxime quidem quos consectetur quaerat minima facilis.</p>
<p>Sequi deserunt eligendi, explicabo doloribus ipsam a, quam dolor quibusdam porro ex aut sint est ea quia sapiente, nam consectetur dolores! Possimus nostrum, sunt dolorem enim temporibus voluptates omnis sit.</p>
</div>
</element-story>

## Javascript

[](../components/scrollindicator.js ':include')