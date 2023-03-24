# To Do List

This component demonstrates keyed loops with `html.for`, conditional rendering, state management, and event handlers.

<script src="/components/todo.js" type="module"></script>

## Playground

<element-story tag="ardi-todo">
  <script type="application/json">
	{
		"listlabel": {"type": "text"},
		"addtasklabel": {"type": "text"},
		"todolabel": {"type": "text"},
		"donelabel": {"type": "text"}
	}
  </script>
  <ardi-todo addtasklabel="Add a chore" donelabel="Complete" listlabel="Chores" todolabel="To Do" style="width: 100%"></ardi-todo>
</element-story>

## Javascript

[](../components/todo.js ':include')
