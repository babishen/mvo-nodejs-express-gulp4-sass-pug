<http://thesassway.com/beginner/how-to-structure-a-sass-project>

also...

<https://smacss.com/book/categorizing>

# How to structure a Sass project

One of the most useful features of Sass is being able to separate your stylesheets into separate files. You can then use the `@import` directive to include the source of your individual files into one master stylesheet.

But how should you structure your Sass projects? Is there a standard way of separating out your CSS files?

# Basic directory structure

I like to layout my Sass projects like this:

<div class="highlight">
  <pre>stylesheets/
|
|-- modules/              # Common modules
|   |-- _all.scss         # Include to get all modules
|   |-- _utility.scss     # Module name
|   |-- _colors.scss      # Etc...
|   ...
|
|-- partials/             # Partials
|   |-- _base.sass        # imports for all mixins + global project variables
|   |-- _buttons.scss     # buttons
|   |-- _figures.scss     # figures
|   |-- _grids.scss       # grids
|   |-- _typography.scss  # typography
|   |-- _reset.scss       # reset
|   ...
|
|-- vendor/               # CSS or Sass from other projects
|   |-- _colorpicker.scss
|   |-- _jquery.ui.core.scss
|   ...
|
`-- main.scss            # primary Sass file
</pre>
</div>

# Primary stylesheet

This allows me to keep my primary Sass file extremely clean:

<div class="highlight">
  <pre><span class="c1">// Modules and Variables</span>
<span class="k">@import</span> <span class="s2">"partials/base"</span><span class="p">;</span>

<span class="c1">// Partials</span>
<span class="k">@import</span> <span class="s2">"partials/reset"</span><span class="p">;</span>
<span class="k">@import</span> <span class="s2">"partials/typography"</span><span class="p">;</span>
<span class="k">@import</span> <span class="s2">"partials/buttons"</span><span class="p">;</span>
<span class="k">@import</span> <span class="s2">"partials/figures"</span><span class="p">;</span>
<span class="k">@import</span> <span class="s2">"partials/grids"</span><span class="p">;</span>
<span class="c1">// ...</span>

<span class="c1">// Third-party</span>
<span class="k">@import</span> <span class="s2">"vendor/colorpicker"</span><span class="p">;</span>
<span class="k">@import</span> <span class="s2">"vendor/jquery.ui.core"</span><span class="p">;</span></pre>
</div>

# Modules, partials, and vendor

As you can see this divides my project into three basic types of files. Modules, partials, and vendored stylesheets.

- The **modules** directory is reserved for Sass code that doesn't cause Sass to actually output CSS. Things like mixin declarations, functions, and variables.

- The **partials** directory is where the meat of my CSS is constructed. A lot of folks like to break their stylesheets into header, content, sidebar, and footer components (and a few others). As I'm more of a [SMACSS](http://smacss.com/) guy myself, I like to break things down into much finer categories (typography, buttons, textboxes, selectboxes, etc...).

- The **vendor** directory is for third-party CSS. This is handy when using prepackaged components developed by other people (or for your own components that are maintained in another project). jQuery UI and a color picker are examples of CSS that you might want to place in the vendor directory. As a general rule I make it a point not to modify files in my vendor directory. If I need to make modifications I add those after the vendored files are included in my primary stylesheet. This should make it easy for me to update my third-party stylesheets to more current versions in the future.

# Using a base partial

In my partials directory you will also notice that I have a base partial. The purpose of this partial is to load up my Sass environment so that it's easy to construct a stylesheet.

It might look something like this:

<div class="highlight">
  <pre><span class="c1">// Use Compass ('cause it rocks!)</span>
<span class="k">@import</span> <span class="s2">"compass"</span><span class="p">;</span>

<span class="c1">// Font weights</span>
<span class="nv">$light</span><span class="o">:</span> <span class="mi">100</span><span class="p">;</span>
<span class="nv">$regular</span><span class="o">:</span> <span class="mi">400</span><span class="p">;</span>
<span class="nv">$bold</span><span class="o">:</span> <span class="mi">600</span><span class="p">;</span>

<span class="c1">// Base Font</span>
<span class="nv">$base-font-family</span><span class="o">:</span> <span class="no">sans-serif</span><span class="p">;</span>
<span class="nv">$base-font-weight</span><span class="o">:</span> <span class="nv">$regular</span><span class="p">;</span>
<span class="nv">$base-font-size</span><span class="o">:</span> <span class="mi">13</span><span class="kt">px</span><span class="p">;</span>
<span class="nv">$base-line-height</span><span class="o">:</span> <span class="mi">1</span><span class="mf">.4</span><span class="p">;</span>

<span class="c1">// Fixed Font</span>
<span class="nv">$fixed-font-family</span><span class="o">:</span> <span class="no">monospace</span><span class="p">;</span>
<span class="nv">$fixed-font-size</span><span class="o">:</span> <span class="mi">85</span><span class="kt">%</span><span class="p">;</span>
<span class="nv">$fixed-line-height</span><span class="o">:</span> <span class="nv">$base-line-height</span><span class="p">;</span>

<span class="c1">// Headings</span>
<span class="nv">$header-font-weight</span><span class="o">:</span> <span class="nv">$bold</span><span class="p">;</span>

<span class="k">@import</span> <span class="s2">"modules/all"</span><span class="p">;</span></pre>
</div>

The base stylesheet sets a couple of global variables and loads up all of my Sass modules. Again modules are not allowed to contain anything that would cause CSS output when importing. Tying all of my variables and modules up into a base partial gives me access to my entire Sass environment whenever I'm setting up a new stylesheet with a single import statement. This allows me to build multiple stylesheets by importing different partials. Multiple stylesheets are handy once a project grows to a certain size.

# One step further

At [UserVoice](http://uservoice.com) we take this pattern one step further. Since we have multiple sub-projects all bundled together in a single Rails app, we bundle each sub-project into a separate top-level directory. Our stylesheet directory looks more like this:

<div class="highlight">
  <pre>stylesheets/
|
|-- admin/           # Admin sub-project
|   |-- modules/
|   |-- partials/
|   <code>-- _base.scss
|
|-- account/         # Account sub-project
|   |-- modules/
|   |-- partials/
|</code>-- _base.scss
|
|-- site/            # Site sub-project
|   |-- modules/
|   |-- partials/
|   <code>-- _base.scss
|
|-- vendor/          # CSS or Sass from other projects
|   |-- _colorpicker-1.1.scss
|   |-- _jquery.ui.core-1.9.1.scss
|   ...
|
|-- admin.scss       # Primary stylesheets for each project
|-- account.scss</code>-- site.scss
</pre>
</div>

As you can see each sub-project has it's own primary stylesheet, modules, partials, and base. Vendored stylesheets are typically versioned and have their own top-level directory. This is a handy pattern to use on very large Sass projects.
