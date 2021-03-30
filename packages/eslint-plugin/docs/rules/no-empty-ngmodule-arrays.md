# Enforces the removal of empty metadata arrays from the NgModule decorator (`no-empty-ngmodule-arrays`)

This rule enforces that NgModule metadata arrays are not empty.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
@NgModule({
  bootstrap: [],
  providers: [_Provider, BProvider, AProvider, CProvider],
})
export class AppModule {}
```

Example of **correct** code for this rule:

```ts
@Component({
  providers: [_Provider, AProvider, BProvider, CProvider],
})
export class AppComponent {}
```

## Options

There are no additional options for this rule

```json
{
  "@angular-eslint/no-empty-ngmodule-arrays": ["error"]
}
```
