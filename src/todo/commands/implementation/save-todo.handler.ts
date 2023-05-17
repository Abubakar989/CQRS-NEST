export class SaveTodoCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
  ) {}
}
