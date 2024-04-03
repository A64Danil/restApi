<?php
namespace MyProject\Models\Articles;


use MyProject\Models\ActiveRecordEntity;
use MyProject\Models\Users\User;


class Article extends ActiveRecordEntity
{


    protected $name;


    protected $text;


    protected $authorId;


    protected $createdAt;


    public function getName(): string
    {

        return $this->name;

    }

    public function setName(string $value): void
    {

        $this->name = $value;

    }


    public function getText(): string
    {

        return $this->text;

    }

    public function setText(string $value): void
    {

        $this->text = $value;

    }

    public function getAuthor(): User
    {

        return User::getById($this->authorId);

    }

    /**
     * @param User $author
     */

    public function setAuthor(User $author): void
    {

        $this->authorId = $author->getId();

    }


    protected static function getTableName(): string
    {

        return 'articles';

    }

}