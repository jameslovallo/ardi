# Employee Card

This component demonstrates conditional rendering and event handlers.

<script src="/components/employee.js" type="module"></script>

<style>
  ardi-employee {
    max-width: var(--demo-max-width);
    width: 100%;
  }
</style>

## Playground

<element-story>
  <script type="application/json">
    {
      "name": {
        "type": "text"
      },
      "position": {
        "type": "text"
      },
      "phone": {
        "type": "text"
      },
      "email": {
        "type": "text"
      },
      "photo": {
        "type": "text"
      }
    }
  </script>
  <ardi-employee
    name="Ashley Fox"
    position="Chief Technical Officer"
    phone="1234567890"
    email="ashely@fake.com"
    photo="/assets/ashley.png"
  ></ardi-employee>
</element-story>

## Javascript

[](../components/employee.js ':include')
