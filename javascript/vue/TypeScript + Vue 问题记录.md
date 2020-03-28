# TypeScript + Vue 问题记录

使用vue-cli 3.0+Element-ui时候，调用form表单校验时候出现的问题 ：

```ts
Property 'validate' does not exist on type 'Element | Element[] | Vue | Vue[]'.   Property 'validate' does not exist on type 'Element'.
```

解决方案：

```ts
(this.$refs.form as any).validate((valid: boolean) => {
    if (valid) {
    } else {
    }
});
```

