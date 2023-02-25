# Employee Card

This component demonstrates conditional rendering and event handlers.

<script src="/components/employee.js" type="module"></script>

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
    style="width: 100%; max-width: 350px;"
  ></ardi-employee>
</element-story>

## Javascript

[](../components/employee.js ':include')
