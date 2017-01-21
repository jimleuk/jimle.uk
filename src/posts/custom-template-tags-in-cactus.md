---
layout: post.pug
title: Custom template tags in your Cactus project
author: Jim Le
date: 2015-12-27 15:53
tags: cactus
---
### Template Tags

If you've used the python-based web framework [Django](https://www.djangoproject.com/) for any adequately sized project, you'll soon realise how excellent of an idea Django's [template tags](https://docs.djangoproject.com/en/1.9/ref/templates/builtins/) are.

Template tags, in brief, allow extending Django's templating capabilities to handle just about anything the designer throws at you. They also satisfy the criteria of being incredible easy to write; on most occasions, the designer will write the "tag" themselves.

Here's an example of a __filter tag__ which converts text to lowercase:

```python
def lower(value):
    """Converts a string into all lowercase"""
    return value.lower()

register.filter('lower', lower)
```

then used later in your template like this...

```django
# greeting = "HELLO WORLD"
{% verbatim %}{{ greeting|lower }} # outputs "hello world"{% endverbatim %}
```

Nice. The filter tag is the simplest type of tag available. Other powerful tag types take arbitrary arguments as input well as complete blocks of your template[^1].

### Cactus

[Cactus](https://github.com/koenbok/Cactus) is a static site generator written in [python](https://www.python.org/) and uses Django templating engine to render its pages. The [cactus docs for plugins](http://cactusformac.com/docs/extras.html#plugins) touch on template tags but you'll need to know a little about Django and how Cactus works beforehand.

The problem is django looks through each of its "installed apps" for a template tag directory to load custom template tags ([docs](https://docs.djangoproject.com/en/1.6/howto/custom-template-tags/#code-layout)). Unfortunately since our project isn't a registered django app at configuration time, django won't know where to locate our tags come render time.
```django
# pages/index.html
{% verbatim %}{% load my_tags %}{% endverbatim %} # assuming a plugins/my_tags.py exists

# will throw:  
# django.template.base.TemplateSyntaxError: 'my_tags' is not a valid tag library: Template library plugins not found, tried django.templatetags.plugins,django\_markwhat.templatetags.plugins
```
Fortunately, this is a pretty easy fix.

### Creating your first custom template tag

__1. Setup__

For the purpose of this demonstration, create a template_tags.py file in your plugins folder[^2].

```bash
/
/pages
/plugins
	__init__.py
	template_tags.py
/static
/templates
config.json
```
In template_tags.py, let's create a simple function which takes python dictionaries and returns them in a JSON format.
```python
# plugins/template_tags.py
import json

from django import template
register = template.Library()

def jsonify(value):
	return json.dumps(value)

register.filter('jsonify', jsonify)
```
__2. Adding your project to the python path__

Open plugins/__init\__.py and add the following code. This also has the benefit of making your project path available to all plugins.
```python
# plugins/__init__.py
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
```
__3. Registering your template tags with django__

While still in plugins/__init\__.py, add the following code.

```
# plugins/__init__.py
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from django.template.loader import add_to_builtins
add_to_builtins('plugins.template_tags')
```
So here, we've injected our custom templates tags into django itself using the ```add_to_builtins``` method. There are a couple of benefits doing it this way:

1. It's much cleaner and easier than trying to alter django's INSTALLED_APPS settings.
2. We don't need to create a ```templatestags``` directory for our project. Although you could if you wanted to.
3. We don't have to use the ```{% verbatim %}{% load template_tags %}{% endverbatim %}``` template syntax in our template files as our tags will automatically be loaded at render time.

Though the potential side effects of using this method would be overriding builtin tags accidentally which in this case, I would then recommending have a unique naming convention for your tags.

__4. Test it out__
```javascript
// pages/index.html
// context['user'] = { "name": "jim", "gender": "male" }
var user = {% verbatim %}{{ user|jsonify }}{% endverbatim %};

// should output: user = { name: "jim", "gender": "male "};
```
Very nice!

You can find additional [documentation on custom templates tags](https://docs.djangoproject.com/en/1.8/howto/custom-template-tags/) from the official django site.

Happy templating!


[^1]: If you're just getting started with Django, the [builtin tags documentation](https://docs.djangoproject.com/en/1.8/ref/templates/builtins/) is a good read before you start writing your own custom template tags.
[^2]: Creating a file specifically called ```template_tags.py``` in your plugins folder is not a strict requirement.